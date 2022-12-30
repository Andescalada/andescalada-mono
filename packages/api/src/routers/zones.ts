import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { notNull } from "@andescalada/api/src/utils/filterGuards";
import getAuth0UsersByRole from "@andescalada/api/src/utils/getAuth0UsersByRole";
import pushNotification from "@andescalada/api/src/utils/notificationEntityType";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import sendPushNotification from "@andescalada/api/src/utils/sendPushNotification";
import { slug } from "@andescalada/api/src/utils/slug";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import updateZoneStatus from "@andescalada/api/src/utils/updateZoneStatus";
import { StatusSchema } from "@andescalada/db/zod";
import Auth0Roles from "@andescalada/utils/Auth0Roles";
import { InfoAccess, SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const zonesRouter = t.router({
  all: t.procedure.query(({ ctx }) =>
    ctx.prisma.zone.findMany({
      where: {
        isDeleted: SoftDelete.NotDeleted,
        infoAccess: InfoAccess.Public,
        currentStatus: "Published",
      },
    }),
  ),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({ where: { id: input } });
    if (!zone) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No zone with id '${input}'`,
      });
    }

    return zone;
  }),
  location: protectedZoneProcedure.query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: { Location: true, name: true },
    });
    if (!zone) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No zone with id '${input}'`,
      });
    }
    return zone;
  }),
  edit: t.procedure
    .input(
      z
        .object({
          name: zone.schema.shape.name.optional(),
          coordinates: zone.schema.shape.coordinates,
        })
        .merge(zone.id),
    )
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.zone.update({
          where: { id: input.zoneId },
          data: {
            ...(input.name && { name: input.name }),
            ...(input.coordinates && {
              Location: { create: input.coordinates },
            }),
            version: { increment: 1 },
          },
        }),
    ),
  // Asset being downloaded
  allSectors: protectedZoneProcedure.query(async ({ ctx, input }) => {
    const res = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: {
        name: true,
        isDeleted: true,
        sectors: {
          where: { isDeleted: SoftDelete.NotDeleted },
          include: {
            walls: {
              where: { isDeleted: SoftDelete.NotDeleted },
              select: { name: true, id: true },
              orderBy: { position: "asc" },
            },
          },
        },
        infoAccess: true,
        currentStatus: true,
        DownloadedBy: { where: { email: ctx.user.email } },
        FavoritedBy: { where: { email: ctx.user.email } },
      },
    });
    if (!res || res?.isDeleted !== SoftDelete.NotDeleted) {
      throw new TRPCError(error.sectorNotFound(input.zoneId));
    }

    if (
      res.infoAccess !== "Public" &&
      !ctx.permissions.has("Read") &&
      !ctx.user.permissions.includes("review:zone")
    ) {
      return {
        ...res,
        sectors: undefined,
        hasAccess: false,
        isDownloaded: false,
        isFavorite: false,
      };
    }

    return {
      ...res,
      hasAccess: true,
      isDownloaded: res.DownloadedBy.length > 0,
      isFavorite: res.FavoritedBy.length > 0,
    };
  }),
  create: protectedProcedure
    .input(zone.schema)
    .mutation(async ({ ctx, input }) => {
      const roleByZone = await ctx.prisma.roleByZone.create({
        data: {
          Role: { connect: { name: "Admin" } },
          User: { connect: { email: ctx.user.email } },
          Zone: {
            create: {
              name: input.name,
              slug: slug(input.name),
              infoAccess: input.infoAccess,
              statusHistory: {
                create: {
                  modifiedBy: { connect: { email: ctx.user.email } },
                  status: "Unpublished",
                  message: {
                    create: {
                      originalText: "Recién creada",
                      originalLang: { connect: { languageId: "es" } },
                    },
                  },
                },
              },
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

      return roleByZone;
    }),
  find: protectedProcedure.input(zone.nameSearch).mutation(({ ctx, input }) =>
    ctx.prisma.zone.findMany({
      where: {
        name: { contains: input },
        isDeleted: SoftDelete.NotDeleted,
      },
      select: { name: true, id: true },
    }),
  ),
  agreementsList: protectedZoneProcedure.query(async ({ ctx, input }) =>
    ctx.prisma.zoneAgreement.findMany({
      where: { zoneId: input.zoneId, isDeleted: SoftDelete.NotDeleted },
      include: {
        Agreement: { include: { title: { select: { originalText: true } } } },
      },
    }),
  ),
  statusById: protectedZoneProcedure.query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: {
        currentStatus: true,
        statusHistory: true,
        RoleByZone: {
          where: { Role: { name: "Reviewer" } },
          include: {
            User: { select: { name: true, id: true, username: true } },
          },
        },
      },
    });
    if (!zone) {
      throw new TRPCError(error.zoneNotFound(input.zoneId));
    }
    return zone;
  }),
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
});
