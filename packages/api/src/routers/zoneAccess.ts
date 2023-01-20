import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import pushNotification from "@andescalada/api/src/utils/pushNotification";
import sendAndRecordPushNotification from "@andescalada/api/src/utils/sendAndRecordPushNotifications";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import { InfoAccess, RequestStatus, RoleNames } from "@prisma/client";
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
          User: { connect: { email: ctx.user.email } },
          Zone: { connect: { id: input.zoneId } },
          modifiedBy: { connect: { email: ctx.user.email } },
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
          User: { connect: { email: ctx.user.email } },
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
          select: { User: { select: { email: true, id: true } } },
        })
      ).map((n) => ({
        email: n.User.email,
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
              email: true,
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
          modifiedBy: { connect: { email: ctx.user.email } },
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
          User: { select: { username: true, id: true, email: true } },
          Zone: { select: { name: true, infoAccess: true } },
          modifiedBy: { select: { username: true } },
        },
      });

      const roleByZone = await ctx.prisma.roleByZone.create({
        data: {
          User: { connect: { id: input.userId } },
          Zone: { connect: { id: input.zoneId } },
          Role: {
            connect: {
              name:
                accessRequest.Zone.infoAccess === InfoAccess.Private
                  ? RoleNames.Reader
                  : RoleNames.Member,
            },
          },
          AssignedBy: { connect: { email: ctx.user.email } },
        },
        select: {
          Role: { select: { permissions: { select: { action: true } } } },
          User: { select: { email: true } },
          zoneId: true,
        },
      });

      const email = roleByZone.User.email;
      const zoneId = roleByZone.zoneId;
      const permissions = roleByZone.Role.permissions.flatMap((p) => p.action);
      await updateRedisPermissions(ctx.access, email, zoneId, permissions);
      const receivers = [
        { email: accessRequest.User.email, id: accessRequest.User.id },
      ];
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
  rejectAgreements: protectedProcedure
    .input(
      z.object({
        zoneId: z.string(),
        agreementRecord: z.string(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.userZoneAgreementRecord.create({
        data: {
          agreementsRecord: input.agreementRecord,
          hasAgreed: false,
          User: { connect: { email: ctx.user.email } },
          Zone: { connect: { id: input.zoneId } },
        },
      }),
    ),
});

type A = {
  User: {
    email: string;
    profilePhoto: {
      publicId: string | null;
    } | null;
    id: string;
    name: string;
    username: string;
  };
  status: RequestStatus;
}[];
