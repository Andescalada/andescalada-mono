import sector from "@andescalada/api/schemas/sector";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const sectorsRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    const sectors = ctx.prisma.sector.findMany({
      orderBy: { position: "asc" },
    });
    return sectors;
  }),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const sector = await ctx.prisma.sector.findUnique({ where: { id: input } });
    if (!sector) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No sector with id '${input}'`,
      });
    }
    return sector;
  }),
  add: protectedProcedure
    .input(z.object({ zoneId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.sector.aggregate({
        _max: { position: true },
      });
      const biggestPosition = result._max.position || 0;

      const newSector = await ctx.prisma.sector.create({
        data: {
          name: input.name,
          Zone: { connect: { id: input.zoneId } },
          position: biggestPosition + 1,
          Author: { connect: { email: ctx.session.user.email } },
        },
      });

      return newSector;
    }),
  edit: t.procedure
    .input(sector.schema.merge(z.object({ sectorId: z.string() })))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.sector.update({
        where: { id: input.sectorId },
        data: { name: input.name },
      });
    }),
  allWalls: t.procedure
    .input(z.object({ sectorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.sector.findUnique({
        where: { id: input.sectorId },
        select: { walls: { select: { id: true, name: true } } },
      });
      if (!res)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No walls found for sector  with id '${input.sectorId}'`,
        });
      return res.walls;
    }),
});
