import multiPitch from "@andescalada/api/schemas/multiPitch";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@andescalada/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const pitchById = protectedZoneProcedure
  .input(multiPitch.pitchId.merge(z.object({ topoId: z.string().optional() })))
  .query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: { infoAccess: true },
    });

    if (!zone) throw new TRPCError(error.zoneNotFound(input.zoneId));

    if (!ctx.permissions.has("Read") && zone.infoAccess === "Private") {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Read"),
      );
    }

    const pitch = await ctx.prisma.pitch.findUnique({
      where: { id: input.pitchId },
      include: {
        Route: {
          include: { RoutePath: { where: { topoId: input.topoId } } },
        },
      },
    });

    if (!pitch || pitch.isDeleted !== SoftDelete.NotDeleted)
      throw new TRPCError(error.notFound("pitch", input.pitchId));

    return pitch;
  });

export default pitchById;
