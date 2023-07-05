import user from "@andescalada/api/schemas/user";
import zone from "@andescalada/api/schemas/zone";
import offlineAssets from "@andescalada/api/src/routers/user/offlineAsstes";
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
import session from "@andescalada/api/src/utils/session";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import roleNameAssets from "@andescalada/common-assets/roleNameAssets";
import { Actions, Entity, Image, RoleNames, SoftDelete } from "@andescalada/db";
import { RoleNamesSchema } from "@andescalada/db/zod";
import { TRPCError } from "@trpc/server";
import { deserialize } from "superjson";
import { z } from "zod";

import { t } from "../../createRouter";
import updateDownloadedAssets from "./updateDownloadedAssets";

export const userRouter = t.router({
  offlineAssets: offlineAssets,
  updateDownloadedAssets: updateDownloadedAssets,
  ownInfo: protectedProcedure.query(async ({ ctx }) =>
    ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
      select: {
        email: true,
        PhoneNumber: { select: { fullNumber: true } },
        firstLogin: true,
        id: true,
        profilePhoto: true,
        name: true,
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
        where: { id: ctx.user.id },
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
      where: { Receiver: { id: ctx.user.id }, isRead: false },
      data: { isRead: true },
    });

    return res;
  }),
  addPhoneNumber: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        fullNumber: z.string(),
        phoneNumber: z.string().optional(),
        country: z.string().optional(),
        countryCode: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.phoneNumber.upsert({
        where: { fullNumber: input.fullNumber },
        update: {
          country: input.country,
          countryCode: input.countryCode,
          number: input.phoneNumber,
          fullNumber: input.fullNumber,
        },
        create: {
          country: input.country,
          fullNumber: input.fullNumber,
          countryCode: input.countryCode,
          number: input.phoneNumber,
          User: { connect: { id: input.userId } },
        },
      });
    }),
  edit: protectedProcedure
    .input(user.schema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: {
          name: input.name,
          username: input.username,
          profilePhoto: input.image ? { create: input.image } : undefined,
        },
      });

      await session.set({
        ctx,
        user: { ...ctx.user, name: user.name, username: user.username },
      });

      return user;
    }),
  firstTimeLogin: protectedProcedure
    .input(z.boolean())
    .mutation(({ ctx, input }) =>
      ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: { firstLogin: input },
      }),
    ),
  editGradingSystem: protectedProcedure
    .input(user.gradeSystem)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: {
          preferredTradGrade: input.preferredTradGrade,
          preferredSportGrade: input.preferredSportGrade,
          preferredBoulderGrade: input.preferredBoulderGrade,
        },
      });
    }),
  zoneHistory: protectedProcedure.query(async ({ ctx }) => {
    const rawHistory = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
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
        const res = await ctx.access.hget<Access>(ctx.user.id, input.zoneId);
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
          ctx.user.id,
          input.zoneId,
          permissionSet,
        );

        return updatedPermissions;
      }
    }),
  zonesByRole: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.user
      .findUnique({
        where: { id: ctx.user.id },
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

      const receivers = [{ id: User.id }];

      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({
          zoneName: Zone.name,
          sender: ctx.user.username,
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
          ...(input.filterMe && { NOT: { id: ctx.user.id } }),
          isDeleted: SoftDelete.NotDeleted,
          OR: [{ emailVerified: true }, { phoneVerified: true }],
        },
        select: {
          id: true,
          name: true,
          username: true,
          profilePhoto: { select: { publicId: true } },
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
  acceptTermsAndConditions: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.acceptTermsAndConditions.create({
      data: { user: { connect: { id: ctx.user.id } } },
    });
  }),
  deactivate: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data: { isDeleted: SoftDelete.DeletedPublic },
    });
  }),
  permanentDelete: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.delete({
      where: { id: ctx.user.id },
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
        where: { id: ctx.user.id },
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
          userId: ctx.user.id,
          zoneId: input.zoneId,
        },
      },
      create: {
        user: { connect: { id: ctx.user.id } },
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
      where: { userId: ctx.user.id },
      data: { isDeleted: SoftDelete.DeletedPublic },
    }),
  ),

  removeRecentZone: protectedZoneProcedure.mutation(({ ctx, input }) => {
    return ctx.prisma.history.updateMany({
      where: { AND: { zoneId: input.zoneId, userId: ctx.user.id } },
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
        where: { id: ctx.user.id },
        data: { FavoriteZones: { connect: { id: input.zoneId } } },
      });
    },
  ),
  removeToDownloadedZones: protectedZoneProcedure.mutation(({ ctx, input }) =>
    ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data: { DownloadedZones: { disconnect: { id: input.zoneId } } },
    }),
  ),
  removeToFavoriteZones: protectedZoneProcedure.mutation(
    async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: { FavoriteZones: { disconnect: { id: input.zoneId } } },
      });
    },
  ),
  getDownloadedAssets: protectedProcedure.query(async ({ ctx }) => {
    const list = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
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
        userId: ctx.user.id,
      });

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
            zoneName: r.Zone.name,
          })),
        );

      const { entity, id, template } = pushNotification.ZoneReviewAssigned;

      await sendAndRecordPushNotification(ctx, {
        Entity: entity,
        entityId: input.zoneId,
        entityTypeId: id,
        message: template.es({
          zoneName: admins[0].zoneName,
          user: ctx.user.username,
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
