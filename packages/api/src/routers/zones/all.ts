import { t } from "@andescalada/api/src/createRouter";
import { SoftDelete, Status } from "@prisma/client";

const all = t.procedure.query(({ ctx }) =>
  ctx.prisma.zone.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      currentStatus: Status.Published,
    },
  }),
);

export default all;