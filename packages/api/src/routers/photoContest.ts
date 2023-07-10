import zone from "@andescalada/api/schemas/zone";
import { t } from "@andescalada/api/src/createRouter";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { SoftDelete } from "@andescalada/db";

export const photoContestRouter = t.router({
  getCurrentContest: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.photoContest.findFirst({
      where: { ending: { gt: new Date() } },
      orderBy: { starting: "asc" },
      take: 1,
      include: { Zones: { select: { name: true, id: true } } },
    });
  }),
  getZone: protectedProcedure.input(zone.id).query(({ ctx, input }) => {
    return ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: {
        sectors: {
          where: { isDeleted: SoftDelete.NotDeleted },
          select: {
            id: true,
            name: true,
            walls: {
              where: { isDeleted: SoftDelete.NotDeleted },
              select: { name: true, id: true },
            },
          },
        },
      },
    });
  }),
});
