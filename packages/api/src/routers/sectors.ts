import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const sectorsRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    const zones = ctx.prisma.sector.findMany();
    return zones;
  }),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.sector.findUnique({ where: { id: input } });
    if (!zone) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No zone with id '${input}'`,
      });
    }
    return zone;
  }),
  add: t.procedure
    .input(z.object({ zoneId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      ctx.prisma.sector.create({
        data: { name: input.name, zoneId: input.zoneId },
      });
    }),
});
