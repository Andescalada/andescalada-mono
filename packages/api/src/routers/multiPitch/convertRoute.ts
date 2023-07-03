import route from "@andescalada/api/schemas/route";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { PitchType } from "@andescalada/db";
import { TRPCError } from "@trpc/server";

const convertRoute = protectedZoneProcedure
  .input(route.routeId)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.permissions.has("Update")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Update"),
      );
    }
    const firstPitch = await ctx.prisma.route.findUnique({
      where: { id: input.routeId },
      select: {
        name: true,
        Author: { select: { id: true } },
        wallId: true,
        position: true,
      },
    });

    if (!firstPitch) throw new TRPCError(error.routeNotFound(input.routeId));

    await ctx.prisma.wall.update({
      where: { id: firstPitch.wallId },
      data: { version: { increment: 1 } },
    });

    await ctx.prisma.route.update({
      where: { id: input.routeId },
      data: {
        version: { increment: 1 },
        name: `${firstPitch.name}-1`,
      },
    });

    return ctx.prisma.multiPitch.create({
      data: {
        name: firstPitch.name,
        slug: slug(firstPitch.name),
        position: firstPitch.position,
        Author: { connect: { id: firstPitch.Author.id } },
        coAuthors:
          firstPitch.Author.id !== ctx.user.id
            ? { connect: { id: ctx.user.id } }
            : undefined,
        Wall: { connect: { id: firstPitch.wallId } },
        Pitches: {
          create: {
            number: 1,
            Route: { connect: { id: input.routeId } },
            pitchType: PitchType.Normal,
          },
        },
      },
    });
  });

export default convertRoute;
