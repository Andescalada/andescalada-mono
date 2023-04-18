import multiPitch from "@andescalada/api/schemas/multiPitch";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import updatePositionsOnDelete from "@andescalada/api/src/utils/updatePositionsOnDelete";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const deleteById = protectedZoneProcedure
  .input(multiPitch.id)
  .mutation(async ({ ctx, input }) => {
    const itemToDelete = await ctx.prisma.multiPitch.findUnique({
      where: { id: input.multiPitchId },
      select: {
        Author: { select: { email: true } },
      },
    });
    if (
      !ctx.permissions.has("Delete") &&
      itemToDelete?.Author.email !== ctx.user.email
    ) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Delete"),
      );
    }
    const deletedMultiPitch = await ctx.prisma.multiPitch.update({
      where: { id: input.multiPitchId },
      data: {
        isDeleted: SoftDelete.DeletedPublic,
      },
    });

    await ctx.prisma.wall.update({
      where: { id: deletedMultiPitch.wallId },
      data: {
        version: { increment: 1 },
      },
    });

    await updatePositionsOnDelete({
      ctx,
      wallId: deletedMultiPitch.wallId,
      deletedPosition: deletedMultiPitch.position,
      zoneId: input.zoneId,
    });

    return deletedMultiPitch;
  });

export default deleteById;
