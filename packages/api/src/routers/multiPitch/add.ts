import route from "@andescalada/api/schemas/route";
import wall from "@andescalada/api/schemas/wall";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const add = protectedZoneProcedure
  .input(wall.id.merge(route.schema.pick({ name: true, unknownName: true })))
  .mutation(async ({ ctx, input }) => {
    if (!ctx.permissions.has("Create")) {
      throw new TRPCError(
        error.unauthorizedActionForZone("Create", input.zoneId),
      );
    }

    const routesPosition = await ctx.prisma.route.aggregate({
      where: {
        wallId: input.wallId,
        isDeleted: SoftDelete.NotDeleted,
      },
      _max: { position: true },
    });
    const multiPitchPosition = await ctx.prisma.multiPitch.aggregate({
      where: {
        wallId: input.wallId,
        isDeleted: SoftDelete.NotDeleted,
      },
      _max: { position: true },
    });

    const position =
      Math.max(
        routesPosition._max.position || 0,
        multiPitchPosition._max.position || 0,
      ) + 1;

    return ctx.prisma.multiPitch.create({
      data: {
        Author: { connect: { email: ctx.user.email } },
        Wall: { connect: { id: input.wallId } },
        name: input.name,
        slug: slug(input.name),
        unknownName: input.unknownName,
        position,
      },
    });
  });

export default add;
