import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import pushNotification from "@andescalada/api/src/utils/pushNotification";
import sendAndRecordPushNotification from "@andescalada/api/src/utils/sendAndRecordPushNotifications";
import { RequestStatus } from "@prisma/client";
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
  usersRequestingAccessToZone: protectedZoneProcedure.mutation(
    ({ ctx, input }) => {
      if (!ctx.permissions.has("GrantAccess")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "GrantAccess"),
        );
      }

      return ctx.prisma.zoneAccessRequest.findMany({
        where: { zoneId: input.zoneId, status: RequestStatus.Pending },
        select: { User: { select: { username: true, email: true, id: true } } },
      });
    },
  ),
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
