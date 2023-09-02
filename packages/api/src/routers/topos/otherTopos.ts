import wall from "@andescalada/api/schemas/wall";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

export const otherTopos = protectedZoneProcedure
  .input(wall.id)
  .query(async ({ ctx, input }) => {
    return ctx.prisma.topo.findMany({ where: { wallId: input.wallId } });
  });

export const otherToposCount = protectedZoneProcedure
  .input(wall.id)
  .query(async ({ ctx, input }) => {
    return ctx.prisma.topo.count({ where: { wallId: input.wallId } });
  });
