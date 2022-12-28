import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import updateZoneStatus from "@andescalada/api/src/utils/updateZoneStatus";
import { StatusSchema } from "@andescalada/db/zod";
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

    if (res.infoAccess !== "Public" && !ctx.permissions.has("Read")) {
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
      select: { currentStatus: true, statusHistory: true },
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
          error.unauthorized(input.zoneId, "RequestZoneReview"),
        );
      }
      const status = await updateZoneStatus(ctx, {
        status: StatusSchema.Enum.InReview,
        message: input.message,
        zoneId: input.zoneId,
      });
      return status;
    }),
});
