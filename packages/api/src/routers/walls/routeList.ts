import wall from "schemas/wall";
import parsedWall from "utils/parsedWall";
import { protectedZoneProcedure } from "utils/protectedZoneProcedure";

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
