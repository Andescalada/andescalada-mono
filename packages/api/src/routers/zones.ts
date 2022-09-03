import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const zonesRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    const zones = ctx.prisma.zones.findMany({
      include: { regions: { select: { name: true } } },
    });
    console.log(zones);
    return zones;
  }),
  byId: t.procedure.input(z.number()).query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zones.findUnique({ where: { id: input } });
    if (!zone) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No zone with id '${input}'`,
      });
    }
    return zone;
  }),
});
