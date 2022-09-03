import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const zonesRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    const zones = ctx.prisma.zones.findMany();
    console.log(zones);
    return zones;
  }),
});
