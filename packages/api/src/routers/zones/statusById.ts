import { TRPCError } from "@trpc/server";
import error from "utils/errors";
import { protectedZoneProcedure } from "utils/protectedZoneProcedure";

const statusById = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const zone = await ctx.prisma.zone.findUnique({
    where: { id: input.zoneId },
    select: {
      currentStatus: true,
      statusHistory: {
        include: { message: { select: { originalText: true } } },
      },

      RoleByZone: {
        where: { Role: { name: "Reviewer" } },
        include: {
          User: { select: { name: true, id: true, username: true } },
        },
      },
    },
  });
  if (!zone) {
    throw new TRPCError(error.zoneNotFound(input.zoneId));
  }
  return zone;
});

export default statusById;
