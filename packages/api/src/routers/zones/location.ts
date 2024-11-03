import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { InfoAccess, SoftDelete } from "@andescalada/db";
import { TRPCError } from "@trpc/server";

const location = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const zone = await ctx.prisma.zone.findUnique({
    where: { id: input.zoneId },
    select: {
      Location: true,
      infoAccess: true,
      name: true,
      sectors: {
        where: { isDeleted: SoftDelete.NotDeleted },
        select: {
          name: true,
          id: true,
          Location: { select: { latitude: true, longitude: true } },
        },
      },
    },
  });

  if (!zone) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `No zone with id '${input}'`,
    });
  }

  if (zone.infoAccess !== InfoAccess.Public && !ctx.permissions.has("Read")) {
    throw new TRPCError(error.unauthorizedActionForZone(input.zoneId, "Read"));
  }

  return zone;
});

export default location;
