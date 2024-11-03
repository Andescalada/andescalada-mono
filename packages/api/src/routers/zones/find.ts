import { SoftDelete } from "@andescalada/db";
import zone from "schemas/zone";
import { protectedProcedure } from "utils/protectedProcedure";

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
