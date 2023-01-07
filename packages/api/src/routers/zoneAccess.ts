import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import pushNotification from "@andescalada/api/src/utils/pushNotification";
import sendAndRecordPushNotification from "@andescalada/api/src/utils/sendAndRecordPushNotifications";
import { RequestStatus } from "@prisma/client";
import { z } from "zod";

import { t } from "../createRouter";

export const zoneAccessRouter = t.router({
  requestZoneAccess: protectedProcedure
    .input(z.object({ zoneId: z.string(), message: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const accessRequest = await ctx.prisma.zoneAccessRequest.create({
        data: {
          status: RequestStatus.Pending,
          user: { connect: { email: ctx.user.email } },
          zone: { connect: { id: input.zoneId } },
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
          user: { select: { username: true } },
          zone: { select: { name: true } },
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
          zoneName: accessRequest.zone.name,
          user: accessRequest.user.username,
        }),
        receivers,
      });

      return accessRequest;
    }),
});
