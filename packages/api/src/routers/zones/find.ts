import zone from "@andescalada/api/schemas/zone";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { SoftDelete } from "@prisma/client";

const find = protectedProcedure
  .input(zone.nameSearch)
  .mutation(({ ctx, input }) =>
    ctx.prisma.zone.findMany({
      where: {
        name: { contains: input },
        isDeleted: SoftDelete.NotDeleted,
      },
      select: { name: true, id: true },
    }),
  );

export default find;
