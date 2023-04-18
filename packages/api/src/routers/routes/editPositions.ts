import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const editPosition = protectedZoneProcedure
  .input(z.object({ positions: z.record(z.number()) }))
  .mutation(async ({ ctx, input: { positions, ...input } }) => {
    if (!ctx.permissions.has("Update")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Update"),
      );
    }
    const updatePositions = Object.entries(positions).map(([id, position]) =>
      ctx.prisma.route.update({
        where: { id },
        data: { position },
      }),
    );

    const res = await ctx.prisma.$transaction(updatePositions);
    const wallId = res[0].wallId;

    await ctx.prisma.wall.update({
      where: { id: wallId },
      data: { version: { increment: 1 } },
    });

    return res;
  });

export default editPosition;
