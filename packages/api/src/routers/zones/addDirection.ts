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
        Author: { select: { email: true } },
        coAuthors: { select: { email: true } },
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
      existingDirections.Author.email !== ctx.user.email &&
      !existingDirections.coAuthors.some((c) => c.email === ctx.user.email)
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
          existingDirections?.Author.email === ctx.user.email
            ? undefined
            : {
                connect: { email: ctx.user.email },
              },
      },
      create: {
        Zone: { connect: { id: input.zoneId } },
        Author: {
          connect: { email: ctx.user.email },
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
