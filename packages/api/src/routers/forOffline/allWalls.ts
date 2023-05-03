import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const allWalls = protectedProcedure
  .input(z.object({ sectorId: z.string() }))
  .query(async ({ ctx, input }) => {
    const res = await ctx.prisma.sector.findUnique({
      where: { id: input.sectorId },
      select: {
        isDeleted: true,
        sectorKind: true,
        name: true,
        Zone: { select: { name: true } },
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
    return res;
  });

export default allWalls;
