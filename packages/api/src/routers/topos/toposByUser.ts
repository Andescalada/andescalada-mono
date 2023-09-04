import wall from "@andescalada/api/schemas/wall";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

export const toposByUser = protectedZoneProcedure
  .input(wall.id)
  .query(({ ctx, input }) => {
    return ctx.prisma.topo.findMany({
      where: { wallId: input.wallId, Author: { id: ctx.user.id } },
      include: { Verification: true },
    });
  });

export const toposByUserCount = protectedZoneProcedure
  .input(wall.id)
  .query(({ ctx, input }) => {
    return ctx.prisma.topo.count({
      where: { wallId: input.wallId, Author: { id: ctx.user.id } },
    });
  });
