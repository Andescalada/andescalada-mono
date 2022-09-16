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
      const biggestPosition = Number(result._max.position) || 0;

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
});
