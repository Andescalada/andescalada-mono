import global from "@andescalada/api/schemas/global";
import user from "@andescalada/api/schemas/user";
import zone from "@andescalada/api/schemas/zone";
import addDirection from "@andescalada/api/src/routers/zones/addDirection";
import all from "@andescalada/api/src/routers/zones/all";
import allSectors from "@andescalada/api/src/routers/zones/allSectors";
import publicById from "@andescalada/api/src/routers/zones/publicById";
import publicWallById from "@andescalada/api/src/routers/zones/publicWallById";
import recentlyAdded from "@andescalada/api/src/routers/zones/recentlyAdded";
import error from "@andescalada/api/src/utils/errors";
import parseUsersToRole from "@andescalada/api/src/utils/parseUsersToRole";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../../createRouter";

export const zonesRouter = t.router({
  all,
  recentlyAdded,
  publicById,
  publicWallById,
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
  allSectors,
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
  usersByRole: protectedZoneProcedure
    .input(z.object({ roles: user.rolesArray }))
    .query(async ({ ctx, input }) => {
      const zone = await ctx.prisma.zone.findUnique({
        where: { id: input.zoneId },
        select: {
          infoAccess: true,
          RoleByZone: {
            where: { Role: { OR: input.roles.map((r) => ({ name: r })) } },
            orderBy: { updatedAt: "desc" },
            include: {
              Role: true,
              User: {
                select: {
                  name: true,
                  id: true,
                  username: true,
                  profilePhoto: { select: { publicId: true } },
                },
              },
            },
          },
        },
      });

      if (!ctx.permissions.has("Read") && zone?.infoAccess !== "Public") {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "Read"),
        );
      }

      const parsedData = parseUsersToRole(zone?.RoleByZone);

      return parsedData;
    }),
  directionsById: protectedZoneProcedure.query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: {
        infoAccess: true,
        ZoneDirections: {
          orderBy: { createdAt: "desc" },
          include: {
            description: { select: { originalText: true } },
            name: { select: { originalText: true } },
          },
        },
      },
    });
    if (!ctx.permissions.has("Read") && zone?.infoAccess !== "Public") {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Read"),
      );
    }

    if (!zone) {
      throw new TRPCError(error.zoneNotFound(input.zoneId));
    }

    return zone;
  }),
  addDirection,
});
