import route from "@andescalada/api/schemas/route";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";

const upsertDescription = protectedZoneProcedure
  .input(route.description.merge(route.routeId))
  .mutation(async ({ ctx, input }) => {
    const route = await ctx.prisma.route.findUnique({
      where: { id: input.routeId },
      select: { description: true, Author: { select: { id: true } } },
    });

    if (!ctx.permissions.has("Create")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Create"),
      );
    }

    if (
      !!route?.description &&
      route.Author.id !== ctx.user?.id &&
      !ctx.permissions.has("Update")
    ) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Update"),
      );
    }
    return ctx.prisma.route.update({
      where: { id: input.routeId },
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
