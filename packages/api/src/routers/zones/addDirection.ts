import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@andescalada/db";
import { TRPCError } from "@trpc/server";

const addDirection = protectedZoneProcedure
  .input(zone.addDirections)
  .mutation(async ({ ctx, input }) => {
    const existingDirections = await ctx.prisma.zoneDirections.findUnique({
      where: {
        ZoneTransportationModeUnique: {
          transportationMode: input.transportationMode,
          zoneId: input.zoneId,
        },
      },
      select: {
        isDeleted: true,
        id: true,
        Author: { select: { id: true } },
        coAuthors: { select: { id: true } },
        descriptionId: true,
        nameId: true,
      },
    });

    if (!existingDirections && !ctx.permissions.has("Create")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Create"),
      );
    }

    if (
      existingDirections &&
      !ctx.permissions.has("Update") &&
      existingDirections.Author.id !== ctx.user.id &&
      !existingDirections.coAuthors.some((c) => c.id === ctx.user.id)
    ) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Update"),
      );
    }

    const directions = await ctx.prisma.zoneDirections.upsert({
      where: {
        ZoneTransportationModeUnique: {
          transportationMode: input.transportationMode,
          zoneId: input.zoneId,
        },
      },
      update: {
        isDeleted: SoftDelete.NotDeleted,
        name: {
          ...(input.name && {
            upsert: {
              create: {
                originalText: input.name,
                originalLang: { connect: { languageId: "es" } },
              },
              update: {
                originalText: input.name,
                originalLang: { connect: { languageId: "es" } },
              },
            },
          }),
        },
        description: {
          update: { originalText: input.description },
        },
        transportationMode: input.transportationMode,
        coAuthors:
          existingDirections?.Author.id === ctx.user.id
            ? undefined
            : {
                connect: { id: ctx.user.id },
              },
      },
      create: {
        Zone: { connect: { id: input.zoneId } },
        Author: {
          connect: { id: ctx.user.id },
        },
        name: input.name
          ? {
              create: {
                originalText: input.name,
                originalLang: { connect: { languageId: "es" } },
              },
            }
          : undefined,
        transportationMode: input.transportationMode,
        description: {
          create: {
            originalText: input.description,
            originalLang: { connect: { languageId: "es" } },
          },
        },
      },
    });

    await ctx.prisma.zone.update({
      where: { id: input.zoneId },
      data: { version: { increment: 1 } },
    });

    return directions;
  });

export default addDirection;
