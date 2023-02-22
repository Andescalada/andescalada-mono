import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const edit = protectedZoneProcedure
  .input(
    z.object({
      name: zone.schema.shape.name.optional(),
      coordinates: zone.schema.shape.coordinates,
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (!ctx.permissions.has("Update")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Update"),
      );
    }

    const zone = await ctx.prisma.zone.update({
      where: { id: input.zoneId },
      data: {
        ...(input.name && { name: input.name, slug: slug(input.name) }),
        ...(input.coordinates && {
          Location: {
            create: input.coordinates,
          },
        }),
        version: { increment: 1 },
      },
    });
    return zone;
  });

export default edit;
