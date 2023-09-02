import topo from "@andescalada/api/schemas/topo";
import wall from "@andescalada/api/schemas/wall";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

export const setMainTopo = protectedZoneProcedure
  .input(topo.id.merge(wall.id))
  .mutation(async ({ ctx, input }) => {
    const setMainTopo = ctx.prisma.topo.update({
      where: { id: input.topoId },
      data: { main: true, version: { increment: 1 } },
    });

    const setNotMainTopos = ctx.prisma.topo.updateMany({
      where: { wallId: input.wallId, id: { not: input.topoId }, main: true },
      data: { main: false, version: { increment: 1 } },
    });

    const incrementWall = ctx.prisma.wall.update({
      where: { id: input.wallId },
      data: { version: { increment: 1 } },
    });

    const result = await ctx.prisma.$transaction([
      setMainTopo,
      setNotMainTopos,
      incrementWall,
    ]);

    return result[0];
  });
