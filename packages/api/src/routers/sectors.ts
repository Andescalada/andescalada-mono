import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const sectorsRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    const sectors = ctx.prisma.sector.findMany({
      orderBy: { position: 'desc' },
    });
    return sectors;
  }),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const sector = await ctx.prisma.sector.findUnique({ where: { id: input } });
    if (!sector) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No sector with id '${input}'`,
      });
    }
    return sector;
  }),
  add: t.procedure
    .input(z.object({ zoneId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const biggestPosition = await ctx.prisma.sector.aggregate({
        _max: { position: true },
      });

      const newSector = await ctx.prisma.sector.create({
        data: {
          name: input.name,
          zoneId: input.zoneId,
          position: biggestPosition._max.position
            ? Number(biggestPosition._max.position) + 1
            : 1,
        },
      });

      return newSector;
    }),
});
