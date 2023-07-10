import wall from "@andescalada/api/schemas/wall";
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
            sectorKind: true,
            zoneId: true,
            walls: {
              where: { isDeleted: SoftDelete.NotDeleted },
              select: { name: true, id: true },
            },
          },
        },
      },
    });
  }),
  userParticipatingByWall: protectedProcedure
    .input(wall.id)
    .query(({ ctx, input }) => {
      return ctx.prisma.userPhotoContestTopo.findMany({
        where: { Topo: { wallId: input.wallId }, isSubmitted: true },
        select: {
          updatedAt: true,
          User: {
            select: {
              id: true,
              name: true,
              username: true,
              profilePhoto: true,
            },
          },
        },
      });
    }),
  submittedToposByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userPhotoContestTopo.findMany({
      where: { isSubmitted: true, userId: ctx.user.id },
      select: {
        updatedAt: true,
        Topo: {
          select: {
            Wall: {
              select: {
                Sector: { select: { Zone: { select: { name: true } } } },
              },
            },
          },
        },
      },
    });
  }),
  // submitTopo: protectedProcedure.input(),
});
