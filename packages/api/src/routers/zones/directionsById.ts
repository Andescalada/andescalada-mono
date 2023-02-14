import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";

const directionsById = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const zone = await ctx.prisma.zone.findUnique({
    where: { id: input.zoneId },
    select: {
      infoAccess: true,
      ZoneDirections: {
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

  if (!zone) {
    throw new TRPCError(error.zoneNotFound(input.zoneId));
  }

  return zone;
});

export default directionsById;
