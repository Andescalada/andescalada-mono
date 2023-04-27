import user from "@andescalada/api/schemas/user";
import zone from "@andescalada/api/schemas/zone";
import { Access, Permissions } from "@andescalada/api/src/types/permissions";
import assignAndCacheRole from "@andescalada/api/src/utils/assignAndCacheRole";
import error from "@andescalada/api/src/utils/errors";
import { notNull } from "@andescalada/api/src/utils/filterGuards";
import getAndParsePermissions from "@andescalada/api/src/utils/getAndParsePermissions";
import parseZonesToRole from "@andescalada/api/src/utils/parseZonesToRole";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import pushNotification from "@andescalada/api/src/utils/pushNotification";
import removeRole from "@andescalada/api/src/utils/removeRole";
import sendAndRecordPushNotification from "@andescalada/api/src/utils/sendAndRecordPushNotifications";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import roleNameAssets from "@andescalada/common-assets/roleNameAssets";
import { RoleNamesSchema } from "@andescalada/db/zod";
import { Actions, Entity, Image, RoleNames, SoftDelete } from "@prisma/client";
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
        NotificationReceived: {
          select: { Object: { select: { createdAt: true } }, id: true },
        },
        RoleByZone: {
          distinct: ["zoneId"],
          select: {
            Zone: { select: { id: true, name: true, infoAccess: true } },
          },
        },
      },
    }),
  ),
  notifications: protectedProcedure
    .input(
      z.object({ filterReadNotifications: z.boolean().optional() }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.prisma.user.findUnique({
        where: { email: ctx.user.email },
        select: {
          NotificationReceived: {
            include: {
              Object: {
                include: {
                  NotificationSender: {
                    include: {
                      Sender: { include: { profilePhoto: true } },
                    },
                  },
                },
              },
            },
          },
        },
      });
      const promiseRes = notifications?.NotificationReceived.filter((n) =>
        input?.filterReadNotifications ? !n.isRead : true,
      ).map(async (n) => {
        if (n.Object.Entity === Entity.Zone) {
          const zone = await ctx.prisma.zone.findUnique({
            where: { id: n.Object.entityId },
            select: { name: true, id: true },
          });
          return { ...n, zone };
        }
        return n;
      });
      const res = await Promise.all(promiseRes ?? []);

      const ordered = res.sort(
        (a, b) => b.Object.createdAt.getTime() - a.Object.createdAt.getTime(),
      );
      return ordered;
    }),
  setNotificationToRead: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.notificationReceiver.update({
        where: { id: input },
        data: { isRead: true },
      });
    }),
  setManyNotificationsToRead: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.prisma.notificationReceiver.updateMany({
      where: { Receiver: { email: ctx.user.email }, isRead: false },
      data: { isRead: true },
    });

    return res;
  }),
  edit: protectedProcedure.input(user.schema).mutation(({ ctx, input }) =>
    ctx.prisma.user.update({
      where: { email: ctx.user.email },
      data: {
        name: input.name,
        username: input.username,
        profilePhoto: input.image ? { create: input.image } : undefined,
      },
    }),
  ),
  firstTimeLogin: protectedProcedure
    .input(z.boolean())
    .mutation(({ ctx, input }) =>
      ctx.prisma.user.update({
        where: { email: ctx.user.email },
        data: { firstLogin: input },
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
      let permissions: Permissions = new Set();
      try {
        const res = await ctx.access.hget<Access>(ctx.user.email, input.zoneId);
        if (res) {
          permissions = deserialize<Permissions>(res);
          return permissions;
        } else {
          throw new Error("No permissions in Upstash");
        }
      } catch {
        const permissionSet = await getAndParsePermissions(ctx, input.zoneId);

        const updatedPermissions = await updateRedisPermissions(
          ctx.access,
          ctx.user.email,
          input.zoneId,
          permissionSet,
        );

        return updatedPermissions;
      }
    }),
  zonesByRole: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.user
      .findUnique({
        where: { email: ctx.user.email },
        select: {
          RoleByZone: {
            select: {
              createdAt: true,
              Zone: {
                select: {
                  id: true,
                  name: true,
                  infoAccess: true,
                },
              },
              Role: { select: { name: true } },
            },
          },
        },
      })
      .then(parseZonesToRole),
  ),
  assignRoleToUser: protectedZoneProcedure
    .input(user.schema.pick({ username: true }).merge(user.role))
    .mutation(async ({ ctx, input }) => {
      if (
        !ctx.user.permissions.includes("crud:roles") &&
        !ctx.permissions.has("AssignZoneRole")
      ) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "AssignZoneRole"),
        );
      }
      const {
        filteredRoles,
        data: { User, Zone },
      } = await assignAndCacheRole(ctx, input);

      const { entity, id, template } = pushNotification.AssignNewZoneRole;

      const receivers = [{ email: User.email, id: User.id }];

      const onwInfo = await ctx.prisma.user.findUnique({
        where: { email: ctx.user.email },
        select: { username: true },
      });

      if (!onwInfo) throw new TRPCError(error.userNotFound(ctx.user.email));

      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({
          zoneName: Zone.name,
          sender: onwInfo?.username,
          role: roleNameAssets[input.role].label,
        }),
        receivers,
      });

      return filteredRoles;
    }),
  adminDeleteRoleByUser: protectedProcedure
    .input(z.object({ roleByZoneId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.permissions.includes("crud:roles")) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return removeRole(ctx, { id: input.roleByZoneId });
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
    .input(
      z.object({
        search: user.usernameSearch,
        filterMe: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          username: { contains: input.search },
          ...(input.filterMe && { NOT: { email: ctx.user.email } }),
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
          const routes = w.routes.flatMap((r) => {
            return {
              router: "routes" as const,
              procedure: "byIdWithEvaluation" as const,
              params: { routeId: r.id, zoneId },
              version: r.version,
              zoneId,
            };
          });
          const topos = w.topos.flatMap((t) => {
            imagesToDownload.push({ ...t.image, zoneId });

            return {
              router: "topos" as const,
              procedure: "byId" as const,
              params: { topoId: t.id, zoneId },
              version: t.version,
              zoneId,
            };
          });
          return [
            {
              router: "walls" as const,
              procedure: "byId" as const,
              params: { wallId: w.id, zoneId },
              version: w.version,
              zoneId,
            },
            ...topos,
            ...routes,
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
  selfAssignZoneToReview: protectedProcedure
    .input(zone.id)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.permissions.includes("review:zone")) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const roles = await assignAndCacheRole(ctx, {
        role: RoleNames.Reviewer,
        zoneId: input.zoneId,
        email: ctx.user.email,
      });

      const admins = await ctx.prisma.roleByZone
        .findMany({
          where: { Role: { name: "Admin" }, zoneId: input.zoneId },
          select: {
            User: { select: { email: true, id: true } },
            Zone: { select: { name: true } },
          },
        })
        .then((r) =>
          r.map((r) => ({
            id: r.User.id,
            email: r.User.email,
            zoneName: r.Zone.name,
          })),
        );

      const user = await ctx.prisma.user.findUnique({
        where: { email: ctx.user.email },
        select: { username: true },
      });

      if (!user) {
        throw new TRPCError(error.userNotFound(ctx.user.email));
      }

      const { entity, id, template } = pushNotification.ZoneReviewAssigned;

      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({
          zoneName: admins[0].zoneName,
          user: user.username,
        }),
        receivers: admins,
      });

      return roles;
    }),
  removeZoneRole: protectedZoneProcedure
    .input(z.object({ role: RoleNamesSchema }).merge(user.id))
    .mutation(({ ctx, input }) => {
      if (!ctx.permissions.has("RevokeZoneRole")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "RevokeZoneRole"),
        );
      }
      if (input.role === RoleNames.Member || input.role === RoleNames.Reader) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Action not allowed for this procedure",
        });
      }

      return removeRole(ctx, {
        relation: {
          zoneId: input.zoneId,
          userId: input.userId,
          roleName: input.role,
        },
      });
    }),
});

const idAndVersion = { id: true, version: true };
