import global from "@andescalada/api/schemas/global";
import sector from "@andescalada/api/schemas/sector";
import error from "@andescalada/api/src/utils/errors";
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
  add: protectedZoneProcedure
    .input(sector.schema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      if (input.sectorId) {
        if (!ctx.permissions.has("Update")) {
          throw new TRPCError(
            error.unauthorizedActionForZone(input.zoneId, "Update"),
          );
        }

        const currentSectorAuthor = await ctx.prisma.sector.findUniqueOrThrow({
          where: { id: input.sectorId },
          select: { Author: { select: { email: true } } },
        });

        return ctx.prisma.sector.update({
          where: { id: input.sectorId },
          data: {
            name: input.name,
            sectorKind: input.sectorKind,
            version: { increment: 1 },
            coAuthors:
              currentSectorAuthor.Author.email !== ctx.user.email
                ? { connect: { email: ctx.user.email } }
                : undefined,
          },
        });
      }

      if (!ctx.permissions.has("Create")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "Create"),
        );
      }
      const result = await ctx.prisma.sector.aggregate({
        where: { zoneId: input.zoneId, isDeleted: SoftDelete.NotDeleted },
        _max: { position: true },
      });

      const biggestPosition = result._max.position || 0;

      const newSector = await ctx.prisma.sector.create({
        data: {
          name: input.name,
          slug: slug(input.name),
          Zone: { connect: { id: input.zoneId } },
          position: biggestPosition + 1,
          sectorKind: input.sectorKind,
          Author: { connect: { email: ctx.user.email } },
        },
      });

      return newSector;
    }),
  edit: protectedZoneProcedure
    .input(sector.edit)
    .mutation(async ({ ctx, input }) => {
      const author = await ctx.prisma.sector.findUnique({
        where: { id: input.sectorId },
        select: { Author: { select: { email: true } } },
      });
      if (
        !ctx.permissions.has("Update") &&
        author?.Author.email !== ctx.user.email
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const sector = await ctx.prisma.sector.update({
        where: { id: input.sectorId },
        data: {
          name: input.name,
          slug: slug(input.name),
          version: { increment: 1 },
          coAuthors:
            author?.Author.email === ctx.user.email
              ? undefined
              : {
                  connect: { email: ctx.user.email },
                },
        },
      });
      await ctx.prisma.zone.update({
        where: { id: sector.zoneId },
        data: { version: { increment: 1 } },
      });
      return sector;
    }),
  // Asset being downloaded
  allWalls: t.procedure
    .input(z.object({ sectorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.sector.findUnique({
        where: { id: input.sectorId },
        select: selectFromSectorAllWalls,
      });
      if (!res || res?.isDeleted !== SoftDelete.NotDeleted)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No walls found for sector  with id '${input.sectorId}'`,
        });
      return res;
    }),
  delete: protectedZoneProcedure
    .input(sector.id.merge(global.isDeleted))
    .mutation(async ({ ctx, input }) => {
      const sector = await ctx.prisma.sector.findUnique({
        where: { id: input.sectorId },
        select: { Author: { select: { email: true } } },
      });
      if (
        !ctx.permissions.has("Delete") &&
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

export const selectFromSectorAllWalls = {
  isDeleted: true,
  id: true,
  sectorKind: true,
  version: true,
  zoneId: true,
  name: true,
  Zone: { select: { name: true } },
  walls: {
    where: { isDeleted: SoftDelete.NotDeleted },
    select: { id: true, name: true },
  },
};
