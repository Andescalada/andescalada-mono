import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../createRouter';

export const zonesRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    return ctx.prisma.zones.findMany({ orderBy: { id: 'asc' } });
  }),
});
