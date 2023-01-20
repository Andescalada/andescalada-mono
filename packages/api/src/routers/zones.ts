import global from "@andescalada/api/schemas/global";
import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import { SoftDelete, Status } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const zonesRouter = t.router({
  all: t.procedure.query(({ ctx }) =>
    ctx.prisma.zone.findMany({
      where: {
        isDeleted: SoftDelete.NotDeleted,
        currentStatus: Status.Published,
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
  edit: protectedZoneProcedure
    .input(
      z.object({
        name: zone.schema.shape.name.optional(),
        coordinates: zone.schema.shape.coordinates,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("Update")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "Update"),
        );
      }

      const zone = await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: {
          ...(input.name && { name: input.name, slug: slug(input.name) }),
          ...(input.coordinates && {
            Location: {
              create: input.coordinates,
            },
          }),
          version: { increment: 1 },
        },
      });
      return zone;
    }),
  editLocation: protectedProcedure
    .input(z.object({ id: z.string(), coordinates: global.coordinates }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.location.update({
        where: { id: input.id },
        data: input.coordinates,
      }),
    ),

  // Asset being downloaded
  allSectors: protectedZoneProcedure.query(async ({ ctx, input }) => {
    const res = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: {
        name: true,
        isDeleted: true,
        ZoneAccessRequest: {
          where: {
            User: { email: ctx.user.email },
            Zone: { id: input.zoneId },
          },
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { status: true },
        },
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
        RoleByZone: {
          select: { User: true, Role: true },
        },
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
        Agreement: {
          include: {
            title: { select: { originalText: true } },
            description: { select: { originalText: true } },
            ZoneAgreement: {
              where: { zoneId: input.zoneId },
              select: { comment: { select: { originalText: true } } },
            },
          },
        },
      },
    }),
  ),
  statusById: protectedZoneProcedure.query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: {
        currentStatus: true,
        statusHistory: {
          include: { message: { select: { originalText: true } } },
        },

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
});
