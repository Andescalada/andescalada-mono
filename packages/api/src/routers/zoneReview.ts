import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { notNull } from "@andescalada/api/src/utils/filterGuards";
import getAuth0UsersByRole from "@andescalada/api/src/utils/getAuth0UsersByRole";
import pushNotification from "@andescalada/api/src/utils/notificationEntityType";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import sendPushNotification from "@andescalada/api/src/utils/sendPushNotification";
import updateZoneStatus from "@andescalada/api/src/utils/updateZoneStatus";
import { StatusSchema } from "@andescalada/db/zod";
import Auth0Roles from "@andescalada/utils/Auth0Roles";
import { TRPCError } from "@trpc/server";

import { t } from "../createRouter";

export const zoneReviewRouter = t.router({
  requestRevision: protectedZoneProcedure
    .input(zone.status.pick({ message: true }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("RequestZoneReview")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "RequestZoneReview"),
        );
      }
      const status = await updateZoneStatus(ctx, {
        status: StatusSchema.Enum.InReview,
        message: input.message,
        zoneId: input.zoneId,
      });

      const globalReviewers = await getAuth0UsersByRole(
        Auth0Roles.ZonePublicationManager,
      );

      const reviewersPromise = globalReviewers.map(
        async (email) =>
          await ctx.prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true },
          }),
      );

      const reviewers = (await Promise.all(reviewersPromise)).filter(notNull);

      const user = await ctx.prisma.user.findUnique({
        where: { email: ctx.user.email },
        select: { username: true },
      });

      if (!user) {
        throw new TRPCError(error.userNotFound(ctx.user.email));
      }

      const body = pushNotification.RequestZoneReview.template.es({
        user: user.username,
        zoneName: status.name,
      });

      try {
        if (reviewers.length <= 0) {
          throw new Error("No reviewers found to notify");
        }
        await ctx.prisma.notificationObject.create({
          data: {
            entityId: input.zoneId,
            Entity: pushNotification.RequestZoneReview.entity,
            entityTypeId: pushNotification.RequestZoneReview.id,
            messageSent: body,
            NotificationSender: {
              create: { Sender: { connect: { email: ctx.user.email } } },
            },
            NotificationReceiver: {
              createMany: {
                data: reviewers.map((r) => ({ receiverId: r.id })),
              },
            },
          },
        });

        await sendPushNotification(
          ctx,
          { body },
          reviewers.map((r) => r.email),
        );
      } catch (err) {}

      return status;
    }),
  currentStatus: protectedProcedure
    .input(zone.status.pick({ status: true }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user.permissions.includes("review:zone"))
        throw new TRPCError(error.unauthorizedAction("review:zone"));

      const zones = await ctx.prisma.zone.findMany({
        where: { currentStatus: input.status },
        select: {
          id: true,
          name: true,
          statusHistory: {
            orderBy: { createdAt: "desc" },
            take: 1,
            include: { modifiedBy: { select: { username: true } } },
          },
        },
      });

      const res = zones
        .map((z) => ({
          status: z.statusHistory[0],
          id: z.id,
          name: z.name,
        }))
        .sort((z) => z.status.createdAt.getTime());

      return res;
    }),
  approveOrRejectZone: protectedZoneProcedure
    .input(zone.approveOrRejectStatus)
    .mutation(async ({ ctx, input }) => {
      if (
        input.status === StatusSchema.Enum.Approved &&
        !ctx.permissions.has("ApproveZone")
      ) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "approve"),
        );
      }

      if (
        input.status === StatusSchema.Enum.Rejected &&
        !ctx.permissions.has("RejectZone")
      ) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "reject"),
        );
      }

      const zone = await updateZoneStatus(ctx, {
        status: input.status,
        zoneId: input.zoneId,
        message: input.message,
      });

      const admins = await ctx.prisma.roleByZone.findMany({
        where: { Role: { name: "Admin" }, zoneId: input.zoneId },
        select: {
          User: { select: { email: true, id: true } },
          Zone: { select: { name: true } },
        },
      });

      const notification = () => {
        if (input.status === StatusSchema.Enum.Approved)
          return pushNotification.ApproveZoneReview;
        else return pushNotification.RejectZoneReview;
      };

      try {
        if (admins.length <= 0) {
          throw new Error("No admins found to notify");
        }
        await ctx.prisma.notificationObject.create({
          data: {
            entityId: input.zoneId,
            Entity: notification().entity,
            entityTypeId: notification().id,
            messageSent: notification().template.es({ zoneName: zone.name }),
            NotificationSender: {
              create: { Sender: { connect: { email: ctx.user.email } } },
            },
            NotificationReceiver: {
              createMany: {
                data: admins.map((r) => ({ receiverId: r.User.id })),
              },
            },
          },
        });

        await sendPushNotification(
          ctx,
          { body: notification().template.es({ zoneName: zone.name }) },
          admins.map((r) => r.User.email),
        );
      } catch (err) {}

      return zone;
    }),
});
