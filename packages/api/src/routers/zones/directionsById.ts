import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const directionsById = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const zone = await ctx.prisma.zone.findUnique({
    where: { id: input.zoneId },
    select: {
      isDeleted: true,
      infoAccess: true,
      ZoneDirections: {
        where: { isDeleted: SoftDelete.NotDeleted },
        orderBy: { createdAt: "desc" },
        include: {
          description: { select: { originalText: true } },
          name: { select: { originalText: true } },
        },
      },
    },
  });
  if (!ctx.permissions.has("Read") && zone?.infoAccess !== "Public") {
    throw new TRPCError(error.unauthorizedActionForZone(input.zoneId, "Read"));
  }

  if (!zone || zone?.isDeleted !== SoftDelete.NotDeleted) {
    throw new TRPCError(error.zoneNotFound(input.zoneId));
  }

  return zone;
});

export default directionsById;
