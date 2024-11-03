import parsedWall from "@andescalada/api/src/utils/parsedWall";

import { ProtectedZoneContext } from "./protectedZoneProcedure";

const updatePositionsOnDelete = async ({
  ctx,
  deletedPosition,
  wallId,
  zoneId,
}: {
  ctx: ProtectedZoneContext;
  wallId: string;
  zoneId: string;
  deletedPosition: number;
}) => {
  const wall = await parsedWall({
    ctx,
    wallId,
    zoneId,
  });

  const routesWithGraterPosition = wall.routes
    .filter((route) => route.position > deletedPosition)
    .map((route) => ({
      id: route.id,
      position: route.position - 1,
      isMultiPitch: false,
    }));

  const multiPitchRoutesWithGraterPosition = wall.MultiPitch.filter(
    (route) => route.position > deletedPosition,
  ).map((route) => ({
    id: route.id,
    position: route.position - 1,
    isMultiPitch: true,
  }));

  const updatePositions = [
    ...routesWithGraterPosition,
    ...multiPitchRoutesWithGraterPosition,
  ].map((route) => {
    if (route.isMultiPitch) {
      return ctx.prisma.multiPitch.update({
        where: { id: route.id },
        data: { position: route.position },
      });
    }
    return ctx.prisma.route.update({
      where: { id: route.id },
      data: { position: route.position },
    });
  });

  return ctx.prisma.$transaction(updatePositions);
};

export default updatePositionsOnDelete;
