import wall from "@andescalada/api/schemas/wall";
import parsedWall from "@andescalada/api/src/routers/walls/parsedWall";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

const routeList = protectedZoneProcedure
  .input(wall.id)
  .query(async ({ ctx, input }) => {
    const wall = await parsedWall({
      ctx,
      wallId: input.wallId,
      zoneId: input.zoneId,
    });

    return wall;
  });

export default routeList;
