import zone from "@andescalada/api/schemas/zone";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const zonesRouter = t.router({
  all: t.procedure.query(({ ctx }) => ctx.prisma.zone.findMany()),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({ where: { id: input } });
    if (!zone) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No zone with id '${input}'`,
      });
    }
    return zone;
  }),
  edit: t.procedure
    .input(zone.schema.merge(z.object({ zoneId: z.string() })))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { name: input.name },
      });
    }),
  allSectors: t.procedure
    .input(z.object({ zoneId: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.zone.findUnique({
        where: { id: input.zoneId },
        select: { sectors: true },
      });
      if (!res) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No sectors found for the zone with id '${input.zoneId}'`,
        });
      }
      return res.sectors;
    }),
});
