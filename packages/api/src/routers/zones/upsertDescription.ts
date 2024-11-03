import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";

const upsertDescription = protectedZoneProcedure
  .input(zone.description)
  .mutation(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: { description: true, Author: { select: { id: true } } },
    });

    if (!ctx.permissions.has("Create")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Create"),
      );
    }

    if (
      !!zone?.description &&
      zone.Author.id !== ctx.user?.id &&
      !ctx.permissions.has("Update")
    ) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Update"),
      );
    }
    return ctx.prisma.zone.update({
      where: { id: input.zoneId },
      data: {
        version: { increment: 1 },
        description: {
          upsert: {
            create: {
              originalText: input.description,
              originalLang: { connect: { languageId: "es" } },
            },
            update: {
              originalText: input.description,
            },
          },
        },
      },
    });
  });

export default upsertDescription;
