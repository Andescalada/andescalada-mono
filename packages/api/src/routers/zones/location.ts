import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";

const location = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const zone = await ctx.prisma.zone.findUnique({
    where: { id: input.zoneId },
    select: { Location: true, name: true },
  });
  if (!zone) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `No zone with id '${input}'`,
    });
  }
  return zone;
});

export default location;
