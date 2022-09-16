import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const toposRouter = t.router({
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const topo = await ctx.prisma.topo.findUnique({
      where: { id: input },
      include: {
        RoutePath: {
          include: { route: { select: { id: true, position: true } } },
        },
      },
    });
    if (!topo) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No topo with id '${input}'`,
      });
    }
    return topo;
  }),
  add: t.procedure
    .input(
      z.object({
        wallId: z.string(),
        name: z.string().optional(),
        image: z.string().optional(),
        topoId: z.string().optional(),
        routePathId: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.topo.create({
        data: {
          wallId: input.wallId,
          image: input.image,
        },
      }),
    ),
});
