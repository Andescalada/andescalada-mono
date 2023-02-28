import { t } from "@andescalada/api/src/createRouter";
import { SearchVisibility, SoftDelete, Status } from "@prisma/client";

const recentlyAdded = t.procedure.query(({ ctx }) =>
  ctx.prisma.zone.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      currentStatus: Status.Published,
      SearchVisibility: SearchVisibility.Listed,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  }),
);

export default recentlyAdded;
