import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { InfoAccessSchema, SearchVisibilitySchema } from "@andescalada/db/zod";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const edit = protectedZoneProcedure
  .input(
    z.object({
      name: zone.schema.shape.name.optional(),
      coordinates: zone.schema.shape.coordinates,
      searchVisibility: z.nativeEnum(SearchVisibilitySchema.Enum).optional(),
      infoAccess: z.nativeEnum(InfoAccessSchema.Enum).optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (!ctx.permissions.has("EditZoneInfo")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "EditZoneInfo"),
      );
    }

    const selectedZone = await ctx.prisma.zone.findUniqueOrThrow({
      where: { id: input.zoneId },
      select: { Author: { select: { id: true } } },
    });

    const zone = await ctx.prisma.zone.update({
      where: { id: input.zoneId },
      data: {
        ...(input.name && { name: input.name, slug: slug(input.name) }),
        ...(input.coordinates && {
          Location: {
            create: input.coordinates,
          },
        }),
        searchVisibility: input.searchVisibility,
        infoAccess: input.infoAccess,
        version: { increment: 1 },
        coAuthors:
          selectedZone.Author?.id === ctx.user.id
            ? { connect: { id: ctx.user.id } }
            : undefined,
      },
    });
    return zone;
  });

export default edit;
