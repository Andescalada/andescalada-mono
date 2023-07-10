import { t } from "@andescalada/api/src/createRouter";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";

export const photoContestRouter = t.router({
  getCurrentContest: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.photoContest.findFirst({
      where: { ending: { gt: new Date() } },
      orderBy: { starting: "asc" },
      take: 1,
      include: { Zones: { select: { name: true, id: true } } },
    });
  }),
});
