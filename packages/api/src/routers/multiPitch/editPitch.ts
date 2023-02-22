import multiPitch from "@andescalada/api/schemas/multiPitch";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";

const editPitch = protectedZoneProcedure
  .input(multiPitch.pitchId.merge(multiPitch.addPitch))
  .mutation(async ({ input, ctx }) => {
    const { originalGradeSystem, grade, kind } = input;

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
      !ctx.permissions.has("Update") &&
      ctx.user.email !== pitch?.MultiPitch?.Author?.email
    ) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Update"),
      );
    }

    const updatedPitch = ctx.prisma.pitch.update({
      where: { id: input.pitchId },
      data: {
        version: { increment: 1 },
        Route: {
          update: {
            kind,
            RouteGrade: {
              update: {
                grade: grade.grade,
                project: grade.project,
                ...(originalGradeSystem && {
                  originalGradeSystem,
                }),
              },
            },
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

    return updatedPitch;
  });

export default editPitch;
