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
          Pitch: { include: { MultiPitch: { select: { name: true } } } },
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
      const maxRoutePosition = await ctx.prisma.route.aggregate({
        where: { wallId: input.wallId, isDeleted: SoftDelete.NotDeleted },
        _max: { position: true },
      });
      const maxMultiPitchPosition = await ctx.prisma.multiPitch.aggregate({
        where: { wallId: input.wallId, isDeleted: SoftDelete.NotDeleted },
        _max: { position: true },
      });

      const biggestPosition =
        Math.max(
          Number(maxRoutePosition._max.position),
          Number(maxMultiPitchPosition._max.position),
        ) ?? 0;

      const { grade, kind, name, originalGradeSystem, unknownName } = input;

      const newRoute = await ctx.prisma.route.create({
        data: {
          name,
          slug: slug(name),
          Wall: { connect: { id: input.wallId } },
          kind,
          unknownName,
          position: biggestPosition + 1,
          RouteGrade: {
            create: {
              grade: grade.grade,
              project: grade.project,
              ...(originalGradeSystem && {
                originalGradeSystem,
              }),
            },
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
        pitchLabelPoint: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const routePath = await ctx.prisma.routePath.upsert({
        where: { id: input.routePathId },
        include: { Author: { select: { email: true } } },
        create: {
          Topo: { connect: { id: input.topoId } },
          Route: { connect: { id: input.routeId } },
          Author: { connect: { email: ctx.user.email } },
          path: input.path,
          pitchLabelPoint: input.pitchLabelPoint,
        },
        update: {
          path: input.path,
          pitchLabelPoint: input.pitchLabelPoint,
        },
      });

      if (routePath.Author.email !== ctx.user.email) {
        await ctx.prisma.routePath.update({
          where: { id: routePath.id },
          data: { coAuthors: { connect: { email: ctx.user.email } } },
        });
      }

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

      const { grade, kind, name, unknownName, originalGradeSystem } = input;

      await ctx.prisma.wall.update({
        where: { id: route?.wallId },
        data: { version: { increment: 1 } },
      });

      return ctx.prisma.route.update({
        where: { id: input.routeId },
        data: {
          RouteGrade: {
            update: {
              ...grade,
              ...(originalGradeSystem && { originalGradeSystem }),
            },
          },
          name,
          slug: slug(name),
          kind,
          unknownName,

          version: { increment: 1 },
          coAuthors:
            route?.Author.email === ctx.user.email
              ? undefined
              : {
                  connect: { email: ctx.user.email },
                },
        },
        include: {
          Wall: {
            select: {
              name: true,
              Sector: { select: { id: true, sectorKind: true } },
            },
          },
        },
      });
    }),
  delete: protectedZoneProcedure
    .input(
      routeSchema.routeId
        .merge(global.isDeleted)
        .merge(z.object({ isExtension: z.boolean().optional() })),
    )
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
