import global from "@andescalada/api/schemas/global";
import routeSchema from "@andescalada/api/schemas/route";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const routesRouter = t.router({
  byId: t.procedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!input) return null;
      const route = await ctx.prisma.route.findUnique({
        where: { id: input },
        include: {
          RouteGrade: true,
          Wall: {
            select: {
              topos: {
                select: {
                  id: true,
                  RoutePath: {
                    where: { routeId: input },
                    select: { path: true },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });
      if (!route || route.isDeleted !== SoftDelete.NotDeleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No route with id '${input}'`,
        });
      }
      return route;
    }),
  add: protectedZoneProcedure
    .input(routeSchema.schema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("Create")) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const result = await ctx.prisma.route.aggregate({
        where: { wallId: input.wallId },
        _max: { position: true },
      });
      const biggestPosition = result._max.position || 0;

      const newRoute = await ctx.prisma.route.create({
        data: {
          name: input.name,
          slug: slug(input.name),
          Wall: { connect: { id: input.wallId } },
          kind: input.kind,
          unknownName: input.unknownName,
          position: biggestPosition + 1,
          RouteGrade: {
            create: { grade: input.grade.grade, project: input.grade.project },
          },
          Author: { connect: { email: ctx.user.email } },
        },
      });

      await ctx.prisma.wall.update({
        where: { id: input.wallId },
        data: { version: { increment: 1 } },
      });

      return newRoute;
    }),
  addExtension: protectedZoneProcedure
    .input(
      routeSchema.schema
        .omit({ wallId: true })
        .merge(routeSchema.extensionParams),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("Create")) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const extendedRoute = await ctx.prisma.route.findUnique({
        where: { id: input.extendedRouteId },
      });

      if (!extendedRoute) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No route with id '${input.extendedRouteId}'`,
        });
      }

      return ctx.prisma.route.create({
        data: {
          name: input.name,
          slug: slug(input.name),
          Wall: { connect: { id: extendedRoute.wallId } },
          kind: input.kind,
          unknownName: input.unknownName,
          position: extendedRoute.position,
          RouteGrade: {
            create: { grade: input.grade.grade, project: input.grade.project },
          },
          ExtendedRoute: { connect: { id: input.extendedRouteId } },
          Author: { connect: { email: ctx.user.email } },
        },
      });
    }),
  updateOrCreatePath: protectedProcedure
    .input(
      z.object({
        routeId: z.string(),
        path: z.string(),
        topoId: z.string(),
        routePathId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateOrCreate = async () => {
        if (input.routePathId) {
          const path = await ctx.prisma.routePath.findUnique({
            where: { id: input.routePathId },
          });
          if (path) {
            return ctx.prisma.routePath.update({
              where: { id: input.routePathId },
              data: { path: input.path },
            });
          }
        } else {
          return ctx.prisma.routePath.create({
            data: {
              Topo: { connect: { id: input.topoId } },
              Route: { connect: { id: input.routeId } },
              Author: { connect: { email: ctx.user.email } },
              path: input.path,
            },
          });
        }
      };

      const routePath = await updateOrCreate();
      await ctx.prisma.topo.update({
        where: { id: input.topoId },
        data: { version: { increment: 1 } },
      });
      return routePath;
    }),
  edit: protectedZoneProcedure
    .input(routeSchema.schema.omit({ wallId: true }).merge(routeSchema.routeId))
    .mutation(async ({ ctx, input }) => {
      const route = await ctx.prisma.route.findUnique({
        where: { id: input.routeId },
        select: { Author: { select: { email: true } }, wallId: true },
      });
      if (
        !ctx.permissions.has("Update") &&
        route?.Author.email !== ctx.user.email
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { grade, kind, name, unknownName } = input;

      await ctx.prisma.wall.update({
        where: { id: route?.wallId },
        data: { version: { increment: 1 } },
      });

      return ctx.prisma.route.update({
        where: { id: input.routeId },
        data: {
          RouteGrade: { update: { ...grade } },
          name,
          kind,
          unknownName,
          version: { increment: 1 },
        },
      });
    }),
  delete: protectedZoneProcedure
    .input(routeSchema.routeId.merge(global.isDeleted))
    .mutation(async ({ ctx, input }) => {
      const route = await ctx.prisma.route.findUnique({
        where: { id: input.routeId },
        select: { Author: { select: { email: true } }, wallId: true },
      });
      if (
        !ctx.permissions.has("Update") &&
        route?.Author.email !== ctx.user.email
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.prisma.wall.update({
        where: { id: route?.wallId },
        data: { version: { increment: 1 } },
      });

      return ctx.prisma.route.update({
        where: { id: input.routeId },
        data: { isDeleted: input.isDeleted },
      });
    }),
});
