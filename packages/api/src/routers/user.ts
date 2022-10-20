import user from "@andescalada/api/schemas/user";
import zone from "@andescalada/api/schemas/zone";
import { Access, Permissions } from "@andescalada/api/src/types/permissions";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { deserialize, serialize } from "superjson";

import { t } from "../createRouter";

export const userRouter = t.router({
  ownInfo: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.user.findUnique({
      where: { email: ctx.user.email },
      select: {
        email: true,
        firstLogin: true,
        id: true,
        profilePhoto: true,
        name: true,
        preferredTradGrade: true,
        preferredBoulderGrade: true,
        preferredSportGrade: true,
        username: true,
        DownloadedZones: { select: { id: true, name: true } },
      },
    }),
  ),
  edit: protectedProcedure.input(user.schema).mutation(({ ctx, input }) =>
    ctx.prisma.user.update({
      where: { email: ctx.user.email },
      data: {
        name: input.name,
        username: input.username,
        profilePhoto: input.image ? { create: input.image } : undefined,
        firstLogin: false,
      },
    }),
  ),
  editGradingSystem: protectedProcedure
    .input(user.gradeSystem)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { email: ctx.user.email },
        data: {
          preferredTradGrade: input.preferredTradGrade,
          preferredSportGrade: input.preferredSportGrade,
          preferredBoulderGrade: input.preferredBoulderGrade,
        },
      });
    }),
  zonePermissions: protectedProcedure
    .input(zone.id)
    .query(async ({ ctx, input }) => {
      const res = await ctx.access.hget<Access>(ctx.user.email, input.zoneId);
      let permissions: Permissions = new Set();
      if (res) {
        permissions = deserialize<Permissions>(res);
      }

      return permissions;
    }),
  assignRoleToUser: protectedProcedure
    .input(user.schema.pick({ username: true }).merge(zone.id).merge(user.role))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.permissions.includes("crud:roles")) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const userToAssign = await ctx.prisma.user.findUnique({
        where: { username: input.username },
        select: { email: true },
      });

      if (!userToAssign) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      const roles = await ctx.prisma.roleByZone.create({
        data: {
          User: { connect: { username: input.username } },
          Role: { connect: { name: input.role } },
          Zone: { connect: { id: input.zoneId } },
          AssignedBy: { connect: { email: ctx.user.email } },
        },
        select: {
          User: {
            select: {
              RoleByZone: {
                select: {
                  Role: {
                    select: { permissions: { select: { action: true } } },
                  },
                },
              },
            },
          },
        },
      });

      const newPermissions = roles.User.RoleByZone.flatMap(
        (r) => r.Role.permissions,
      ).flatMap((p) => p.action);

      const res = await ctx.access.hget<Access>(
        userToAssign.email,
        input.zoneId,
      );
      let updatedPermissions: Permissions;
      if (res) {
        const existingPermissions = deserialize<Permissions>(res);
        updatedPermissions = new Set([
          ...Array.from(existingPermissions),
          ...newPermissions,
        ]);
      } else {
        updatedPermissions = new Set(newPermissions);
      }

      await ctx.access.hset(userToAssign.email, {
        [input.zoneId]: serialize(updatedPermissions),
      });

      return roles;
    }),
  uniqueUsername: protectedProcedure
    .input(user.schema.pick({ username: true }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      });
      if (!user) return true;
      return false;
    }),
  find: protectedProcedure
    .input(user.usernameSearch)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          username: { contains: input },
          isDeleted: SoftDelete.NotDeleted,
        },
        select: {
          id: true,
          name: true,
          username: true,
          profilePhoto: { select: { publicId: true } },
          email: true,
          RoleByZone: {
            select: { Role: { select: { name: true } }, zoneId: true },
          },
        },
      });
    }),
  deactivate: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.update({
      where: { email: ctx.user.email },
      data: { isDeleted: SoftDelete.DeletedPublic },
    });
  }),
  permanentDelete: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.delete({
      where: { email: ctx.user.email },
    });
  }),
  addToDownloadedZones: protectedZoneProcedure.mutation(
    async ({ ctx, input }) => {
      const zoneToAdd = await ctx.prisma.zone.findUnique({
        where: { id: input.zoneId },
        select: {
          isDeleted: true,
          infoAccess: true,
        },
      });
      if (!zoneToAdd || zoneToAdd.isDeleted === SoftDelete.DeletedPublic) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (!ctx.permissions.has("Read") && zoneToAdd.infoAccess !== "Public") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return ctx.prisma.user.update({
        where: { email: ctx.user.email },
        data: { DownloadedZones: { connect: { id: input.zoneId } } },
      });
    },
  ),
  addToFavoriteZones: protectedZoneProcedure.mutation(
    async ({ ctx, input }) => {
      const zoneToAdd = await ctx.prisma.zone.findUnique({
        where: { id: input.zoneId },
        select: {
          isDeleted: true,
          infoAccess: true,
        },
      });
      if (!zoneToAdd || zoneToAdd.isDeleted === SoftDelete.DeletedPublic) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (!ctx.permissions.has("Read") && zoneToAdd.infoAccess !== "Public") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return ctx.prisma.user.update({
        where: { email: ctx.user.email },
        data: { FavoriteZones: { connect: { id: input.zoneId } } },
      });
    },
  ),
  removeToDownloadedZones: protectedZoneProcedure.mutation(
    async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { email: ctx.user.email },
        data: { DownloadedZones: { disconnect: { id: input.zoneId } } },
      });
    },
  ),
  removeToFavoriteZones: protectedZoneProcedure.mutation(
    async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { email: ctx.user.email },
        data: { FavoriteZones: { disconnect: { id: input.zoneId } } },
      });
    },
  ),
  getDownloadedAssets: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.user.findUnique({
      where: { email: ctx.user.email },
      select: {
        DownloadedZones: {
          select: {
            ...idAndVersion,
            sectors: {
              select: {
                ...idAndVersion,
                walls: {
                  select: {
                    ...idAndVersion,
                    routes: {
                      select: {
                        ...idAndVersion,
                        RoutePath: { select: idAndVersion },
                        RouteGrade: { select: idAndVersion },
                      },
                    },
                    topos: { select: idAndVersion },
                  },
                },
              },
            },
          },
        },
      },
    }),
  ),
});

const idAndVersion = { id: true, version: true };
