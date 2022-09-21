import wall from "@andescalada/api/schemas/wall";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const wallsRouter = t.router({
  all: t.procedure.query(({ ctx }) =>
    ctx.prisma.wall.findMany({
      orderBy: { position: "asc" },
    }),
  ),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const wall = await ctx.prisma.wall.findUnique({
      where: { id: input },
      include: {
        routes: {
          orderBy: { position: "asc" },
          select: { name: true, id: true, RouteGrade: true, position: true },
        },
        topos: {
          where: { main: true },
          select: { id: true, image: true, name: true },
        },
      },
    });
    if (!wall) {
      throw new TRPCError({
        code: "NOT_FOUND",
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
      const biggestPosition = result._max.position || 0;

      const newWall = await ctx.prisma.wall.create({
        data: {
          name: input.name,
          sectorId: input.sectorId,
          position: biggestPosition + 1,
        },
      });
      return newWall;
    }),
  allRoutes: t.procedure
    .input(z.object({ wallId: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.wall.findUnique({
        where: { id: input.wallId },
        select: {
          routes: {
            select: { name: true, id: true, position: true, RouteGrade: true },
          },
        },
      });
      if (!res)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No routes found for wall  with id '${input.wallId}'`,
        });
      return res.routes;
    }),
  edit: t.procedure
    .input(wall.schema.merge(z.object({ wallId: z.string() })))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.wall.update({
        where: { id: input.wallId },
        data: { name: input.name },
      });
    }),
});
