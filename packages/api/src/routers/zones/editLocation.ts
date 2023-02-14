import global from "@andescalada/api/schemas/global";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { z } from "zod";

const editLocation = protectedProcedure
  .input(z.object({ id: z.string(), coordinates: global.coordinates }))
  .mutation(({ ctx, input }) =>
    ctx.prisma.location.update({
      where: { id: input.id },
      data: input.coordinates,
    }),
  );

export default editLocation;
