import global from "@andescalada/api/schemas/global";
import wall from "@andescalada/api/schemas/wall";
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
        Sector: { select: { zoneId: true } },
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
  add: protectedZoneProcedure
    .input(z.object({ sectorId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("Create")) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
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

      await ctx.prisma.sector.update({
        where: { id: input.sectorId },
        data: { version: { increment: 1 } },
      });
      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
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
  edit: protectedZoneProcedure
    .input(wall.schema.merge(z.object({ wallId: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const wallToUpdate = await ctx.prisma.wall.findUnique({
        where: { id: input.wallId },
        select: { Author: { select: { email: true } } },
      });
      if (
        !ctx.permissions.has("Update") &&
        wallToUpdate?.Author.email !== ctx.user.email
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const wall = await ctx.prisma.wall.update({
        where: { id: input.wallId },
        data: { name: input.name, version: { increment: 1 } },
      });
      await ctx.prisma.sector.update({
        where: { id: wall.sectorId },
        data: { version: { increment: 1 } },
      });
      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });
      return wall;
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

      const wall = await ctx.prisma.wall.update({
        where: { id: input.wallId },
        data: { isDeleted: input.isDeleted },
      });

      await ctx.prisma.sector.update({
        where: { id: wall.sectorId },
        data: { version: { increment: 1 } },
      });
      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      return wall;
    }),
  mainTopo: protectedZoneProcedure
    .input(wall.id)
    .query(async ({ ctx, input }) => {
      const mainTopo = await ctx.prisma.wall.findUnique({
        where: { id: input.wallId },
        select: {
          topos: {
            where: { main: true },
            select: { id: true },
          },
        },
      });
      if (!mainTopo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return mainTopo.topos[0].id;
    }),
});
