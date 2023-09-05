import global from "@andescalada/api/schemas/global";
import routeSchema from "@andescalada/api/schemas/route";
import { t } from "@andescalada/api/src/createRouter";
import addOrEditEvaluation from "@andescalada/api/src/routers/routes/addOrEditEvaluation";
import addOrEditGradeEvaluation from "@andescalada/api/src/routers/routes/addOrEditGradeEvaluation";
import byIdWithEvaluation from "@andescalada/api/src/routers/routes/byIdWithEvaluation";
import editPosition from "@andescalada/api/src/routers/routes/editPositions";
import evaluationById from "@andescalada/api/src/routers/routes/evaluationById";
import {
  addRouteLength,
  editRouteLength,
} from "@andescalada/api/src/routers/routes/routeLength";
import upsert from "@andescalada/api/src/routers/routes/upsert";
import upsertDescription from "@andescalada/api/src/routers/routes/upsertDescription";
import getMainTopo from "@andescalada/api/src/utils/getMainTopo";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import updatePositionsOnDelete from "@andescalada/api/src/utils/updatePositionsOnDelete";
import { SoftDelete } from "@andescalada/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const routesRouter = t.router({
  editPositions: editPosition,
  addOrEditEvaluation: addOrEditEvaluation,
  // Asset being downloaded
  byIdWithEvaluation: byIdWithEvaluation,
  evaluationById: evaluationById,
  editRouteLength: editRouteLength,
  addRouteLength: addRouteLength,
  upsertDescription: upsertDescription,
  addOrEditGradeEvaluation: addOrEditGradeEvaluation,
  byId: protectedProcedure
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
  upsert: upsert,
  updateOrCreatePath: protectedProcedure
    .input(
      z.object({
        routeId: z.string(),
        path: z.string(),
        topoId: z.string(),
        routePathId: z.string().optional(),
        pitchLabelPoint: z.string().optional(),
        hideStart: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const routePath = await ctx.prisma.routePath.upsert({
        where: { id: input.routePathId || "" },
        include: { Author: { select: { id: true } } },
        create: {
          Topo: { connect: { id: input.topoId } },
          Route: { connect: { id: input.routeId } },
          Author: { connect: { id: ctx.user.id } },
          path: input.path,
          pitchLabelPoint: input.pitchLabelPoint,
        },
        update: {
          path: input.path,
          pitchLabelPoint: input.pitchLabelPoint,
        },
      });

      if (routePath.Author.id !== ctx.user.id) {
        await ctx.prisma.routePath.update({
          where: { id: routePath.id },
          data: { coAuthors: { connect: { id: ctx.user.id } } },
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
      const route = await ctx.prisma.route.findUniqueOrThrow({
        where: { id: input.routeId },
        select: { Author: { select: { id: true } }, wallId: true },
      });
      if (!ctx.permissions.has("Update") && route?.Author.id !== ctx.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const {
        grade,
        kind,
        name,
        unknownName,
        originalGradeSystem,
        originalGrade,
      } = input;

      await ctx.prisma.wall.update({
        where: { id: route.wallId },
        data: { version: { increment: 1 } },
      });

      const updatedRoute = await ctx.prisma.route.update({
        where: { id: input.routeId },
        data: {
          RouteGrade: {
            update: {
              ...grade,
              ...(originalGradeSystem && { originalGradeSystem }),
              ...(originalGrade && { originalGrade }),
            },
          },
          name,
          slug: slug(name),
          kind,
          unknownName,

          version: { increment: 1 },
          coAuthors:
            route?.Author.id === ctx.user.id
              ? undefined
              : {
                  connect: { id: ctx.user.id },
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

      const mainTopoId = await getMainTopo({
        ctx,
        wallId: route.wallId,
      });

      return { ...updatedRoute, mainTopoId };
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
        select: { Author: { select: { id: true } }, wallId: true },
      });
      if (!ctx.permissions.has("Update") && route?.Author.id !== ctx.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const deletedRoute = await ctx.prisma.route.update({
        where: { id: input.routeId },
        data: { isDeleted: input.isDeleted },
      });

      await ctx.prisma.wall.update({
        where: { id: route?.wallId },
        data: { version: { increment: 1 } },
      });

      await updatePositionsOnDelete({
        ctx,
        deletedPosition: deletedRoute.position,
        wallId: deletedRoute?.wallId,
        zoneId: input.zoneId,
      });

      return deletedRoute;
    }),
});
