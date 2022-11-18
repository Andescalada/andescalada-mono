import global from "@andescalada/api/schemas/global";
import sector from "@andescalada/api/schemas/sector";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const sectorsRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    const sectors = ctx.prisma.sector.findMany({
      orderBy: { position: "asc" },
      where: { isDeleted: SoftDelete.NotDeleted },
    });
    return sectors;
  }),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const sector = await ctx.prisma.sector.findUnique({ where: { id: input } });
    if (!sector || sector?.isDeleted !== SoftDelete.NotDeleted) {
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
          slug: slug(input.name),
          Zone: { connect: { id: input.zoneId } },
          position: biggestPosition + 1,
          Author: { connect: { email: ctx.user.email } },
        },
      });

      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      return newSector;
    }),
  edit: t.procedure
    .input(sector.schema.merge(z.object({ sectorId: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const sector = await ctx.prisma.sector.update({
        where: { id: input.sectorId },
        data: { name: input.name, version: { increment: 1 } },
      });
      await ctx.prisma.zone.update({
        where: { id: sector.zoneId },
        data: { version: { increment: 1 } },
      });
      return sector;
    }),
  allWalls: t.procedure
    .input(z.object({ sectorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.sector.findUnique({
        where: { id: input.sectorId },
        select: {
          isDeleted: true,
          walls: {
            where: { isDeleted: SoftDelete.NotDeleted },
            select: { id: true, name: true },
          },
        },
      });
      if (!res || res?.isDeleted !== SoftDelete.NotDeleted)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No walls found for sector  with id '${input.sectorId}'`,
        });
      return res.walls;
    }),
  delete: protectedZoneProcedure
    .input(
      sector.schema
        .omit({ name: true })
        .merge(global.isDeleted)
        .merge(sector.id),
    )
    .mutation(async ({ ctx, input }) => {
      const sector = await ctx.prisma.sector.findUnique({
        where: { id: input.sectorId },
        select: { Author: { select: { email: true } } },
      });
      if (
        !ctx.permissions.has("Update") &&
        sector?.Author.email !== ctx.user.email
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const updatedSector = ctx.prisma.sector.update({
        where: { id: input.sectorId },
        data: { isDeleted: input.isDeleted, version: { increment: 1 } },
      });

      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      return updatedSector;
    }),
});
