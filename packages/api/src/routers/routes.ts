import { RouteKind } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const Kind = RouteKind;

export const routesRouter = t.router({
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const route = await ctx.prisma.route.findUnique({
      where: { id: input },
    });
    if (!route) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No route with id '${input}'`,
      });
    }
    return route;
  }),
  add: t.procedure
    .input(
      z.object({
        wallId: z.string(),
        name: z.string(),
        kind: z.nativeEnum(RouteKind),
        grade: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.route.aggregate({
        _max: { position: true },
      });
      const biggestPosition = result._max.position || 0;

      const newRoute = await ctx.prisma.route.create({
        data: {
          name: input.name,
          wallId: input.wallId,
          kind: input.kind,
          position: biggestPosition + 1,
        },
      });
      return newRoute;
    }),
  addPath: t.procedure
    .input(
      z.object({
        routeId: z.string(),
        path: z.string(),
        topoId: z.string(),
        routePathId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
            topoId: input.topoId,
            routeId: input.routeId,
            path: input.path,
          },
        });
      }
    }),
});