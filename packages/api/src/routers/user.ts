import user from "@andescalada/api/schemas/user";
import zone from "@andescalada/api/schemas/zone";
import { Access, Permissions } from "@andescalada/api/src/types/permissions";
import { notNull } from "@andescalada/api/src/utils/filterGuards";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import { Actions, Image, SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { deserialize } from "superjson";
import { z } from "zod";

import { t } from "../createRouter";

export const userRouter = t.router({
  ownInfo: protectedProcedure.query(async ({ ctx }) =>
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
        DownloadedZones: { select: { id: true, name: true, infoAccess: true } },
        FavoriteZones: { select: { id: true, name: true, infoAccess: true } },
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
  zoneHistory: protectedProcedure.query(async ({ ctx }) => {
    const rawHistory = await ctx.prisma.user.findUnique({
      where: { email: ctx.user.email },
      select: {
        History: {
          where: {
            AND: { action: Actions.Visited, isDeleted: SoftDelete.NotDeleted },
          },
          select: {
            zone: { select: { id: true, name: true, infoAccess: true } },
          },
          orderBy: { updatedAt: "desc" },
        },
      },
    });

    return rawHistory?.History.map((h) => h.zone).filter(notNull);
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

      const roleExist = await ctx.prisma.roleByZone.findMany({
        where: {
          User: { username: input.username },
          Zone: { id: input.zoneId },
          Role: { name: input.role },
        },
      });

      if (roleExist.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `User ${input.username} already has role ${input.role} in zone ${input.zoneId}`,
        });
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
              email: true,
              RoleByZone: {
                select: {
                  id: true,
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

      await updateRedisPermissions(
        ctx.access,
        roles.User.email,
        input.zoneId,
        newPermissions,
      );
      return roles;
    }),
  deleteRoleByUser: protectedProcedure
    .input(z.object({ roleByZoneId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.permissions.includes("crud:roles")) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const deletedRole = ctx.prisma.roleByZone.delete({
        where: { id: input.roleByZoneId },
        select: {
          zoneId: true,
          userId: true,
        },
      });

      const transaction = await ctx.prisma.$transaction([deletedRole]);

      const userId = transaction[0].userId;
      const zoneId = transaction[0].zoneId;

      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
        select: {
          email: true,
          RoleByZone: {
            where: { zoneId },
            select: {
              id: true,
              Role: {
                select: { permissions: { select: { action: true } } },
              },
            },
          },
        },
      });

      if (user) {
        const newPermissions = user.RoleByZone.flatMap((r) => r.Role)
          .flatMap((r) => r.permissions)
          .flatMap((p) => p.action);

        await updateRedisPermissions(
          ctx.access,
          user.email,
          zoneId,
          newPermissions,
        );
      }

      return transaction;
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
            select: {
              Role: { select: { name: true } },
              zoneId: true,
              id: true,
            },
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
  addToRecentZones: protectedZoneProcedure.mutation(async ({ ctx, input }) => {
    console.log("HERE HERE");
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

    return ctx.prisma.history.upsert({
      where: {
        history_unique: {
          action: Actions.Visited,
          email: ctx.user.email,
          zoneId: input.zoneId,
        },
      },
      create: {
        user: { connect: { email: ctx.user.email } },
        action: Actions.Visited,
        zone: { connect: { id: input.zoneId } },
        counter: 1,
      },
      update: {
        isDeleted: SoftDelete.NotDeleted,
        counter: { increment: 1 },
      },
    });
  }),
  removeAllRecentZones: protectedProcedure.mutation(({ ctx }) =>
    ctx.prisma.history.updateMany({
      where: { email: ctx.user.email },
      data: { isDeleted: SoftDelete.DeletedPublic },
    }),
  ),
  removeRecentZone: protectedZoneProcedure.mutation(({ ctx, input }) => {
    console.log("HERE!!");
    return ctx.prisma.history.updateMany({
      where: { AND: { zoneId: input.zoneId, email: ctx.user.email } },
      data: { isDeleted: SoftDelete.DeletedPublic },
    });
  }),
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
  removeToDownloadedZones: protectedZoneProcedure.mutation(({ ctx, input }) =>
    ctx.prisma.user.update({
      where: { email: ctx.user.email },
      data: { DownloadedZones: { disconnect: { id: input.zoneId } } },
    }),
  ),
  removeToFavoriteZones: protectedZoneProcedure.mutation(
    async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { email: ctx.user.email },
        data: { FavoriteZones: { disconnect: { id: input.zoneId } } },
      });
    },
  ),
  getDownloadedAssets: protectedProcedure.query(async ({ ctx }) => {
    const list = await ctx.prisma.user.findUnique({
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
                    topos: { select: { ...idAndVersion, image: true } },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!list) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    const imagesToDownload: Image[] = [];

    const assetsToDownload = list.DownloadedZones.flatMap((z) => {
      const zoneId = z.id;
      const sectors = z.sectors.flatMap((s) => {
        const walls = s.walls.flatMap((w) => {
          const topos = w.topos.flatMap((t) => {
            imagesToDownload.push({ ...t.image, zoneId });

            return {
              router: "topos" as const,
              procedure: "byId" as const,
              params: { topoId: t.id },
              version: t.version,
              zoneId,
            };
          });
          return [
            {
              router: "walls" as const,
              procedure: "byId" as const,
              params: { wallId: w.id },
              version: w.version,
              zoneId,
            },
            ...topos,
          ];
        });
        return [
          {
            router: "sectors" as const,
            procedure: "allWalls" as const,
            params: { sectorId: s.id },
            version: s.version,
            zoneId,
          },
          ...walls,
        ];
      });
      return [
        {
          router: "zones" as const,
          procedure: "allSectors" as const,
          params: { zoneId: z.id },
          version: z.version,
          zoneId,
        },
        ...sectors,
      ];
    });

    return { assetsToDownload, imagesToDownload };
  }),
});

const idAndVersion = { id: true, version: true };
