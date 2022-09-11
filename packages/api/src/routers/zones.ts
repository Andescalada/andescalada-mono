import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const zonesRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    console.log(ctx.session, 'session');
    const zones = ctx.prisma.zone.findMany();
    return zones;
  }),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({ where: { id: input } });
    if (!zone) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No zone with id '${input}'`,
      });
    }
    return zone;
  }),
});
