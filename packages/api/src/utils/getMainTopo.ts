import { ProtectedContext } from "@andescalada/api/src/utils/protectedProcedure";
import { SoftDelete, Wall } from "@andescalada/db";

const getMainTopo = async ({
  ctx,
  wallId,
}: {
  wallId: Wall["id"];
  ctx: ProtectedContext;
}) => {
  const mainTopo = await ctx.prisma.wall.findUnique({
    where: { id: wallId },
    select: {
      topos: {
        where: { main: true, isDeleted: SoftDelete.NotDeleted },
        select: { id: true },
      },
    },
  });

  if (!mainTopo || !mainTopo.topos.length || !mainTopo.topos[0].id) {
    return null;
  }
  return mainTopo.topos[0].id;
};

export default getMainTopo;
