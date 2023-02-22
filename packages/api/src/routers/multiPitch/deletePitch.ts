import multiPitch from "@andescalada/api/schemas/multiPitch";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const deletePitch = protectedZoneProcedure
  .input(multiPitch.pitchId)
  .mutation(async ({ input, ctx }) => {
    const pitch = await ctx.prisma.pitch.findUnique({
      where: { id: input.pitchId },
      select: {
        multiPitchId: true,
        MultiPitch: {
          select: { wallId: true, Author: { select: { email: true } } },
        },
      },
    });

    if (!pitch || !pitch.multiPitchId || !pitch.MultiPitch)
      throw new TRPCError(error.notFound("pitch", input.pitchId));

    if (
      !ctx.permissions.has("Delete") &&
      ctx.user.email !== pitch?.MultiPitch?.Author?.email
    ) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Delete"),
      );
    }

    const deletedPitch = ctx.prisma.pitch.update({
      where: { id: input.pitchId },
      data: {
        isDeleted: SoftDelete.DeletedPublic,
        version: { increment: 1 },
        Route: {
          update: {
            isDeleted: SoftDelete.DeletedPublic,
          },
        },
      },
    });

    await ctx.prisma.wall.update({
      where: { id: pitch.MultiPitch.wallId },
      data: {
        version: { increment: 1 },
      },
    });

    await ctx.prisma.multiPitch.update({
      where: { id: pitch.multiPitchId },
      data: {
        version: { increment: 1 },
        coAuthors:
          pitch?.MultiPitch.Author.email === ctx.user.email
            ? undefined
            : {
                connect: { email: ctx.user.email },
              },
      },
    });

    return deletedPitch;
  });

export default deletePitch;
