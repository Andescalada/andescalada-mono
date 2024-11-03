import zone from "@andescalada/api/schemas/zone";
import assignAndCacheRole from "@andescalada/api/src/utils/assignAndCacheRole";
import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import pushNotification from "@andescalada/api/src/utils/pushNotification";
import removeRole from "@andescalada/api/src/utils/removeRole";
import sendAndRecordPushNotification from "@andescalada/api/src/utils/sendAndRecordPushNotifications";
import { InfoAccess, RequestStatus, RoleNames } from "@andescalada/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const zoneAccessRouter = t.router({
  requestZoneAccess: protectedProcedure
    .input(
      z.object({
        zoneId: z.string(),
        message: z.string().optional(),
        agreementRecord: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const accessRequest = await ctx.prisma.zoneAccessRequest.create({
        data: {
          status: RequestStatus.Pending,
          User: { connect: { id: ctx.user.id } },
          Zone: { connect: { id: input.zoneId } },
          modifiedBy: { connect: { id: ctx.user.id } },
          message: input.message
            ? {
                create: {
                  originalText: input.message,
                  originalLang: { connect: { languageId: "es" } },
                },
              }
            : undefined,
        },
        select: {
          User: { select: { username: true } },
          Zone: { select: { name: true } },
        },
      });

      await ctx.prisma.userZoneAgreementRecord.create({
        data: {
          agreementsRecord: input.agreementRecord,
          hasAgreed: true,
          User: { connect: { id: ctx.user.id } },
          Zone: { connect: { id: input.zoneId } },
        },
      });

      const receivers = (
        await ctx.prisma.roleByZone.findMany({
          where: {
            Zone: { id: input.zoneId },
            Role: {
              permissions: { some: { action: { equals: "GrantAccess" } } },
            },
          },
          select: { User: { select: { id: true } } },
        })
      ).map((n) => ({
        id: n.User.id,
      }));

      const { entity, id, template } = pushNotification.RequestZoneAccess;

      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({
          zoneName: accessRequest.Zone.name,
          user: accessRequest.User.username,
        }),
        receivers,
      });

      return accessRequest;
    }),
  usersRequestingAccessToZone: protectedZoneProcedure.query(
    async ({ ctx, input }) => {
      if (!ctx.permissions.has("GrantAccess")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "GrantAccess"),
        );
      }

      const requests = await ctx.prisma.zoneAccessRequest.findMany({
        where: { Zone: { id: input.zoneId } },
        orderBy: { createdAt: "desc" },
        select: {
          status: true,
          User: {
            select: {
              username: true,
              name: true,
              id: true,
              profilePhoto: { select: { publicId: true } },
            },
          },
        },
      });

      const latestRequest = requests
        .reduce((acc, curr) => {
          const accUser = acc.find((u) => u?.User.id === curr.User.id);
          if (!accUser) return [...acc, curr];
          return acc;
        }, [] as typeof requests)
        .filter((a) => a.status === RequestStatus.Pending);

      return latestRequest;
    },
  ),
  approveZoneAccess: protectedZoneProcedure
    .input(z.object({ userId: z.string(), message: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("GrantAccess")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "GrantAccess"),
        );
      }

      const accessRequest = await ctx.prisma.zoneAccessRequest.create({
        data: {
          status: RequestStatus.Accepted,
          User: { connect: { id: input.userId } },
          Zone: { connect: { id: input.zoneId } },
          modifiedBy: { connect: { id: ctx.user.id } },
          message: input.message
            ? {
                create: {
                  originalText: input.message,
                  originalLang: { connect: { languageId: "es" } },
                },
              }
            : undefined,
        },
        select: {
          User: { select: { username: true, id: true } },
          Zone: { select: { name: true, infoAccess: true } },
          modifiedBy: { select: { username: true } },
        },
      });

      const roleByZone = await assignAndCacheRole(ctx, {
        zoneId: input.zoneId,
        role:
          accessRequest.Zone.infoAccess === InfoAccess.Private
            ? RoleNames.Reader
            : RoleNames.Member,
        userId: input.userId,
      });

      const receivers = [{ id: accessRequest.User.id }];
      const { entity, id, template } = pushNotification.ApproveZoneAccess;

      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({
          zoneName: accessRequest.Zone.name,
          user: accessRequest.modifiedBy.username,
        }),
        receivers,
      });

      return { accessRequest, roleByZone };
    }),
  respondAgreement: protectedProcedure
    .input(
      z.object({
        zoneId: z.string(),
        agreementRecord: z.string(),
        hasAgreed: z.boolean(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.userZoneAgreementRecord.create({
        data: {
          agreementsRecord: input.agreementRecord,
          hasAgreed: input.hasAgreed,
          User: { connect: { id: ctx.user.id } },
          Zone: { connect: { id: input.zoneId } },
        },
      }),
    ),
  userLatestAccessStatus: protectedProcedure
    .input(zone.id)
    .query(({ ctx, input }) =>
      ctx.prisma.zoneAccessRequest.findFirst({
        where: { Zone: { id: input.zoneId }, User: { id: ctx.user.id } },
        orderBy: { createdAt: "desc" },
        select: { status: true },
      }),
    ),
  pauseUserAccess: protectedZoneProcedure
    .input(
      z.object({
        userId: z.string(),
        message: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("PauseZoneAccess")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "PauseZoneAccess"),
        );
      }

      const infoAccess = await ctx.prisma.zone.findUnique({
        where: { id: input.zoneId },
        select: { infoAccess: true },
      });

      if (!infoAccess) throw new TRPCError(error.zoneNotFound(input.zoneId));

      const roleToPause =
        infoAccess.infoAccess === InfoAccess.Private
          ? RoleNames.Reader
          : RoleNames.Member;

      const deletedRole = await removeRole(ctx, {
        relation: {
          zoneId: input.zoneId,
          userId: input.userId,
          roleName: roleToPause,
        },
      });

      const accessRequest = await ctx.prisma.zoneAccessRequest.create({
        data: {
          status: RequestStatus.Paused,
          User: { connect: { id: deletedRole.userId } },
          Zone: { connect: { id: input.zoneId } },
          modifiedBy: { connect: { id: ctx.user.id } },
          message: input.message
            ? {
                create: {
                  originalText: input.message,
                  originalLang: { connect: { languageId: "es" } },
                },
              }
            : undefined,
        },
        select: {
          User: { select: { username: true, id: true } },
          Zone: { select: { name: true, infoAccess: true } },
          modifiedBy: { select: { username: true } },
        },
      });
      return accessRequest;
    }),
});
