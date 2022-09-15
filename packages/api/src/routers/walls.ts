import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const wallsRouter = t.router({
  all: t.procedure.query(({ ctx }) =>
    ctx.prisma.wall.findMany({
      orderBy: { position: 'asc' },
    }),
  ),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const wall = await ctx.prisma.wall.findUnique({ where: { id: input } });
    if (!wall) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No wall with id '${input}'`,
      });
    }
    return wall;
  }),
  add: t.procedure
    .input(z.object({ sectorId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.wall.aggregate({
        _max: { position: true },
      });
      const biggestPosition = Number(result._max.position) || 0;

      const newWall = await ctx.prisma.wall.create({
        data: {
          name: input.name,
          sectorId: input.sectorId,
          position: biggestPosition + 1,
        },
      });
      return newWall;
    }),
});
