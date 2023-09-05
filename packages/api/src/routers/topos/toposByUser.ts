import topo from "@andescalada/api/schemas/topo";
import wall from "@andescalada/api/schemas/wall";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";

import { SoftDelete } from ".prisma/client";

export const toposByUser = protectedZoneProcedure
  .input(wall.id)
  .query(({ ctx, input }) => {
    return ctx.prisma.topo.findMany({
      where: {
        wallId: input.wallId,
        Author: { id: ctx.user.id },
        isDeleted: SoftDelete.NotDeleted,
      },
      include: {
        ...includeInTopo,
        Verification: true,
        Wall: {
          include: {
            Sector: {
              include: { Zone: { select: { name: true, id: true } } },
            },
          },
        },
        Author: {
          select: {
            id: true,
            name: true,
            username: true,
            profilePhoto: true,
          },
        },
      },
    });
  });

export const toposByUserCount = protectedZoneProcedure
  .input(wall.id)
  .query(({ ctx, input }) => {
    return ctx.prisma.topo.count({
      where: {
        wallId: input.wallId,
        Author: { id: ctx.user.id },
        isDeleted: SoftDelete.NotDeleted,
      },
    });
  });

export const deleteTopoByUser = protectedZoneProcedure
  .input(topo.id)
  .mutation(async ({ ctx, input }) => {
    const topoToDelete = await ctx.prisma.topo.findUniqueOrThrow({
      where: { id: input.topoId },
      select: { Author: true, main: true },
    });

    if (
      ctx.permissions.has("Delete") &&
      topoToDelete.Author.id !== ctx.user.id
    ) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Delete"),
      );
    }

    if (topoToDelete.main) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Cannot delete main" });
    }

    return ctx.prisma.topo.update({
      where: { id: input.topoId },
      data: { isDeleted: SoftDelete.DeletedPublic },
    });
  });
