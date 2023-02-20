import multiPitch from "@andescalada/api/schemas/multiPitch";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const addPitch = protectedZoneProcedure
  .input(z.object({ multiPitchId: z.string() }).merge(multiPitch.addPitch))
  .mutation(async ({ input, ctx }) => {
    const { originalGradeSystem, grade, kind } = input;

    if (!ctx.permissions.has("Create")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Create"),
      );
    }

    const multiPitch = await ctx.prisma.multiPitch.findUnique({
      where: { id: input.multiPitchId },
      select: {
        name: true,
        wallId: true,
        Pitches: {
          orderBy: { number: "desc" },
          take: 1,
          select: { number: true },
        },
      },
    });

    if (!multiPitch)
      throw new TRPCError(error.multiPitchNotFound(input.multiPitchId));

    await ctx.prisma.wall.update({
      where: { id: multiPitch.wallId },
      data: {
        version: { increment: 1 },
      },
    });

    await ctx.prisma.multiPitch.update({
      where: { id: input.multiPitchId },
      data: {
        version: { increment: 1 },
      },
    });

    return ctx.prisma.pitch.create({
      data: {
        number: Number(multiPitch.Pitches[0]?.number) + 1,
        MultiPitch: { connect: { id: input.multiPitchId } },
        Route: {
          create: {
            name: multiPitch?.name,
            slug: slug(multiPitch?.name),
            Wall: { connect: { id: multiPitch?.wallId } },
            Author: { connect: { email: ctx.user.email } },
            kind,
            RouteGrade: {
              create: {
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
  });

export default addPitch;
