import route from "@andescalada/api/schemas/route";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { PitchType } from "@prisma/client";
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
        Author: { select: { email: true } },
        wallId: true,
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
        Author: { connect: { email: firstPitch.Author.email } },
        coAuthors:
          firstPitch.Author.email !== ctx.user.email
            ? { connect: { email: ctx.user.email } }
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
