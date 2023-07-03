import multiPitch from "@andescalada/api/schemas/multiPitch";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@andescalada/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const addPitch = protectedZoneProcedure
  .input(z.object({ multiPitchId: z.string() }).merge(multiPitch.addPitch))
  .mutation(async ({ input, ctx }) => {
    const { originalGradeSystem, grade, kind, originalGrade } = input;

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
        position: true,
        Pitches: {
          where: { isDeleted: SoftDelete.NotDeleted },
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

    const number = multiPitch.Pitches[0]?.number
      ? Number(multiPitch.Pitches[0]?.number) + 1
      : 1;

    return ctx.prisma.pitch.create({
      include: {
        MultiPitch: {
          select: {
            name: true,
            id: true,
            position: true,
            wallId: true,
            Wall: { select: { topos: { where: { main: true }, take: 1 } } },
          },
        },
      },
      data: {
        number: number,
        MultiPitch: { connect: { id: input.multiPitchId } },
        Route: {
          create: {
            name: `${multiPitch.name}-${number}`,
            slug: slug(multiPitch.name),
            position: multiPitch.position,
            Wall: { connect: { id: multiPitch.wallId } },
            Author: { connect: { id: ctx.user.id } },
            kind,
            RouteGrade: {
              create: {
                grade: grade.grade,
                project: grade.project,
                ...(originalGradeSystem && {
                  originalGradeSystem,
                }),
                ...(originalGrade && { originalGrade }),
              },
            },
          },
        },
      },
    });
  });

export default addPitch;
