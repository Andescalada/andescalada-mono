import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const sectorsRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    const sectors = ctx.prisma.sector.findMany({
      orderBy: { position: 'asc' },
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
      const result = await ctx.prisma.sector.aggregate({
        _max: { position: true },
      });
      const biggestPosition = Number(result._max.position) || 0;

      const newSector = await ctx.prisma.sector.create({
        data: {
          name: input.name,
          zoneId: input.zoneId,
          position: biggestPosition + 1,
        },
      });

      return newSector;
    }),
  edit: t.procedure
    .input(z.object({ sectorId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.sector.update({
        where: { id: input.sectorId },
        data: { name: input.name },
      });
    }),
  allWalls: t.procedure
    .input(z.object({ sectorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const walls = await ctx.prisma.wall.findMany({
        where: { sectorId: input.sectorId },
        include: { Sector: { select: { name: true, zoneId: true } } },
      });
      return walls;
    }),
});
