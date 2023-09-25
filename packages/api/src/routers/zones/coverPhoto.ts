import image from "@andescalada/api/schemas/image";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { SoftDelete } from ".prisma/client";

export const getCoverPhoto = protectedZoneProcedure.query(
  async ({ ctx, input }) => {
    const res = await ctx.prisma.zone.findUniqueOrThrow({
      where: { id: input.zoneId },
      select: { coverPhoto: true },
    });

    return res.coverPhoto;
  },
);

export const addCoverPhoto = protectedZoneProcedure
  .input(z.object({ image: image.schema }))
  .mutation(async ({ ctx, input }) => {
    if (!ctx.permissions.has("EditZoneInfo")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(
          input.zoneId,
          "EditZoneInfo - Cover Photo",
        ),
      );
    }

    return ctx.prisma.zone.update({
      where: { id: input.zoneId },
      data: { coverPhoto: { create: input.image }, version: { increment: 1 } },
    });
  });

export const deleteCoverPhoto = protectedZoneProcedure
  .input(z.object({ imageId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    if (!ctx.permissions.has("EditZoneInfo")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(
          input.zoneId,
          "EditZoneInfo - Cover Photo",
        ),
      );
    }

    const coverPhoto = ctx.prisma.zone.update({
      where: { id: input.zoneId },
      data: {
        coverPhoto: { disconnect: { id: input.imageId } },
        version: { increment: 1 },
      },
    });

    const markImageAsDeleted = ctx.prisma.image.update({
      where: { id: input.imageId },
      data: { isDeleted: SoftDelete.DeletedPublic },
    });

    return ctx.prisma.$transaction([coverPhoto, markImageAsDeleted]);
  });
