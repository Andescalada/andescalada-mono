import global from "@andescalada/api/schemas/global";
import wall from "@andescalada/api/schemas/wall";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const wallsRouter = t.router({
  all: t.procedure.query(({ ctx }) =>
    ctx.prisma.wall.findMany({
      orderBy: { position: "asc" },
    }),
  ),
  byId: t.procedure.input(wall.id).query(async ({ ctx, input }) => {
    const wall = await ctx.prisma.wall.findUnique({
      where: { id: input.wallId },
      include: {
        routes: {
          orderBy: { position: "asc" },

          where: { isDeleted: { equals: SoftDelete.NotDeleted } },
          select: {
            name: true,
            id: true,
            RouteGrade: true,
            position: true,
            kind: true,
            isDeleted: true,
            Author: { select: { email: true } },
          },
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
  add: protectedProcedure
    .input(z.object({ sectorId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.wall.aggregate({
        _max: { position: true },
      });
      const biggestPosition = result._max.position || 0;

      const newWall = await ctx.prisma.wall.create({
        data: {
          name: input.name,
          slug: slug(input.name),
          Sector: { connect: { id: input.sectorId } },
          position: biggestPosition + 1,
          Author: { connect: { email: ctx.user.email } },
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
        data: { name: input.name, version: { increment: 1 } },
      });
    }),
  delete: protectedZoneProcedure
    .input(
      wall.schema.omit({ name: true }).merge(global.isDeleted).merge(wall.id),
    )
    .mutation(async ({ ctx, input }) => {
      const route = await ctx.prisma.wall.findUnique({
        where: { id: input.wallId },
        select: { Author: { select: { email: true } } },
      });
      if (
        !ctx.permissions.has("Update") &&
        route?.Author.email !== ctx.user.email
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.wall.update({
        where: { id: input.wallId },
        data: { isDeleted: input.isDeleted },
      });
    }),
});
