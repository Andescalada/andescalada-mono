import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { SoftDelete } from "@andescalada/db";

const featured = protectedProcedure.query(async ({ ctx }) => {
  return ctx.prisma.zone.findMany({
    where: {
      featured: true,
      isDeleted: SoftDelete.NotDeleted,
    },
    select: {
      id: true,
      name: true,
      coverPhoto: true,
    },
  });
});

export default featured;
