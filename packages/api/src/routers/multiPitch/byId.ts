import multiPitch from "@andescalada/api/schemas/multiPitch";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { InfoAccess, SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const byId = protectedZoneProcedure
  .input(multiPitch.id)
  .query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: { infoAccess: true },
    });
    if (
      !ctx.permissions.has("Read") &&
      zone?.infoAccess !== InfoAccess.Public
    ) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Read"),
      );
    }

    const multiPitch = await ctx.prisma.multiPitch.findUnique({
      where: { id: input.multiPitchId },
      include: {
        Pitches: {
          where: { isDeleted: SoftDelete.NotDeleted },
          orderBy: { number: "asc" },
          include: {
            Route: { include: { RouteGrade: true } },
          },
        },
      },
    });

    if (!multiPitch)
      throw new TRPCError(error.multiPitchNotFound(input.multiPitchId));

    return multiPitch;
  });

export default byId;
