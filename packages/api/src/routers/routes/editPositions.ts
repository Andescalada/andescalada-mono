import wall from "@andescalada/api/schemas/wall";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const editPosition = protectedZoneProcedure
  .input(
    wall.id.extend({
      positions: z
        .object({
          id: z.string(),
          position: z.number(),
          isMultiPitch: z.boolean(),
        })
        .array(),
    }),
  )
  .mutation(async ({ ctx, input: { wallId, positions, ...input } }) => {
    if (!ctx.permissions.has("Update")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Update"),
      );
    }

    const updatePositions = positions.map(({ id, position, isMultiPitch }) => {
      if (isMultiPitch) {
        return ctx.prisma.multiPitch.update({
          where: { id },
          data: {
            position,
          },
        });
      }
      return ctx.prisma.route.update({
        where: { id },
        data: { position },
      });
    });

    const updatePitch = positions
      .filter(({ isMultiPitch }) => isMultiPitch)
      .map(({ id, position }) =>
        ctx.prisma.pitch.update({
          where: { multiPitchId: id },
          data: { Route: { update: { position } } },
        }),
      );

    const updateFunctions = [...updatePositions, ...updatePitch];

    const res = await ctx.prisma.$transaction(updateFunctions);

    await ctx.prisma.wall.update({
      where: { id: wallId },
      data: { version: { increment: 1 } },
    });

    return res;
  });

export default editPosition;
