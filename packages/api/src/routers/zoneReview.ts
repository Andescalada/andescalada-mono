import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { notNull } from "@andescalada/api/src/utils/filterGuards";
import getAuth0UsersByRole from "@andescalada/api/src/utils/getAuth0UsersByRole";
import { GlobalRoles } from "@andescalada/api/src/utils/globalRoles";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import pushNotification from "@andescalada/api/src/utils/pushNotification";
import sendAndRecordPushNotification from "@andescalada/api/src/utils/sendAndRecordPushNotifications";
import updateZoneStatus from "@andescalada/api/src/utils/updateZoneStatus";
import Auth0Roles from "@andescalada/common-assets/Auth0Roles";
import { Status } from "@andescalada/db";
import { StatusSchema } from "@andescalada/db/zod";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

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
      const zone = await updateZoneStatus(
        ctx,
        {
          status: StatusSchema.Enum.InReview,
          message: input.message,
          zoneId: input.zoneId,
        },
        {
          allowedPreviousSteps: [
            Status.Unpublished,
            Status.Rejected,
            Status.InReview,
          ],
        },
      );

      const globalReviewers = await getAuth0UsersByRole(
        Auth0Roles.ZonePublicationManager,
      );

      const reviewersPromise = globalReviewers.map(
        async (auth0id) =>
          await ctx.prisma.user.findUnique({
            where: { auth0id },
            select: { id: true },
          }),
      );

      const reviewers = (await Promise.all(reviewersPromise)).filter(notNull);

      const { entity, id, template } = pushNotification.RequestZoneReview;

      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({ zoneName: zone.name, user: ctx.user.username }),
        receivers: reviewers,
      });

      return zone;
    }),
  currentStatus: protectedProcedure
    .input(zone.status.pick({ status: true }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user.permissions.includes(GlobalRoles.REVIEW_ZONE))
        throw new TRPCError(error.unauthorizedAction(GlobalRoles.REVIEW_ZONE));

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
        .sort(
          (a, b) => b.status.createdAt.getTime() - a.status.createdAt.getTime(),
        );

      return res;
    }),
  approveZoneReview: protectedZoneProcedure
    .input(zone.approveStatus)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("ApproveZone")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "approve"),
        );
      }
      const zone = await updateZoneStatus(
        ctx,
        {
          status: input.status,
          zoneId: input.zoneId,
          message: input.message ? input.message : "",
        },
        { allowedPreviousSteps: [Status.InReview] },
      );

      const admins = await ctx.prisma.roleByZone
        .findMany({
          where: { Role: { name: "Admin" }, zoneId: input.zoneId },
          select: {
            User: { select: { id: true } },
            Zone: { select: { name: true } },
          },
        })
        .then((r) =>
          r.map((r) => ({
            id: r.User.id,
          })),
        );

      const { entity, id, template } = pushNotification.ApproveZoneReview;

      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({ zoneName: zone.name }),
        receivers: admins,
      });

      return zone;
    }),
  rejectZoneReview: protectedZoneProcedure
    .input(zone.rejectStatus)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("RejectZone")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "approve"),
        );
      }
      const zone = await updateZoneStatus(
        ctx,
        {
          status: input.status,
          zoneId: input.zoneId,
          message: input.message,
        },
        { allowedPreviousSteps: [Status.InReview] },
      );

      const admins = await ctx.prisma.roleByZone
        .findMany({
          where: { Role: { name: "Admin" }, zoneId: input.zoneId },
          select: {
            User: { select: { id: true } },
            Zone: { select: { name: true } },
          },
        })
        .then((r) =>
          r.map((r) => ({
            id: r.User.id,
          })),
        );

      const { entity, id, template } = pushNotification.RejectZoneReview;

      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({ zoneName: zone.name }),
        receivers: admins,
      });

      return zone;
    }),
  publishZone: protectedZoneProcedure
    .input(z.object({ message: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("PublishZone"))
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "PublishZone"),
        );

      const zone = await updateZoneStatus(
        ctx,
        {
          status: Status.Published,
          zoneId: input.zoneId,
          message: input.message || "",
        },
        { allowedPreviousSteps: [Status.Approved, Status.Paused] },
      );

      const admins = await ctx.prisma.roleByZone
        .findMany({
          where: { Role: { name: "Admin" }, zoneId: input.zoneId },
          select: {
            User: { select: { id: true } },
            Zone: { select: { name: true } },
          },
        })
        .then((r) =>
          r.map((r) => ({
            id: r.User.id,
          })),
        );

      const { entity, id, template } = pushNotification.PublishZoneByAdmin;
      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({
          zoneName: zone.name,
          user: ctx.user.username,
        }),
        receivers: admins,
      });

      return zone;
    }),
  pauseZonePublication: protectedZoneProcedure
    .input(z.object({ message: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("PauseZonePublication"))
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "PauseZonePublication"),
        );

      const zone = await updateZoneStatus(
        ctx,
        {
          status: Status.Paused,
          zoneId: input.zoneId,
          message: input.message || "",
        },
        { allowedPreviousSteps: [Status.Published] },
      );

      const admins = await ctx.prisma.roleByZone
        .findMany({
          where: { Role: { name: "Admin" }, zoneId: input.zoneId },
          select: {
            User: { select: { id: true } },
            Zone: { select: { name: true } },
          },
        })
        .then((r) =>
          r.map((r) => ({
            id: r.User.id,
          })),
        );

      const { entity, id, template } = pushNotification.PausePublicationByAdmin;
      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({ zoneName: zone.name, user: ctx.user.username }),
        receivers: admins,
      });

      return zone;
    }),
  unpublishZone: protectedZoneProcedure
    .input(z.object({ message: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("UnpublishZone"))
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "UnpublishZone"),
        );

      const zone = await updateZoneStatus(
        ctx,
        {
          status: Status.Unpublished,
          zoneId: input.zoneId,
          message: input.message || "",
        },
        { allowedPreviousSteps: [Status.Published] },
      );

      const admins = await ctx.prisma.roleByZone
        .findMany({
          where: { Role: { name: "Admin" }, zoneId: input.zoneId },
          select: {
            User: { select: { id: true } },
            Zone: { select: { name: true } },
          },
        })
        .then((r) =>
          r.map((r) => ({
            id: r.User.id,
          })),
        );

      const { entity, id, template } = pushNotification.UnpublishZoneByReviewer;
      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({ zoneName: zone.name, user: ctx.user.username }),
        receivers: admins,
      });

      return zone;
    }),
});
