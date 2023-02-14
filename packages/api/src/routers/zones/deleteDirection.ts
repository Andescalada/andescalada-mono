import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@prisma/client";
import { z } from "zod";

const deleteDirection = protectedZoneProcedure
  .input(z.object({ zoneDirectionId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zoneDirections.update({
      where: { id: input.zoneDirectionId },
      data: { isDeleted: SoftDelete.DeletedPublic },
    });
    return zone;
  });

export default deleteDirection;
