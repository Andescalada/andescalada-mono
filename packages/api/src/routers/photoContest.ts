import image from "@andescalada/api/schemas/image";
import wall from "@andescalada/api/schemas/wall";
import zone from "@andescalada/api/schemas/zone";
import { t } from "@andescalada/api/src/createRouter";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@andescalada/db";
import { z } from "zod";

export const photoContestRouter = t.router({
  getCurrentContest: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.photoContest.findFirst({
      where: { ending: { gt: new Date() } },
      orderBy: { starting: "asc" },
      take: 1,
      include: { Zones: { select: { name: true, id: true } } },
    });
  }),
  getZone: protectedProcedure.input(zone.id).query(async ({ ctx, input }) => {
    const zones = await ctx.prisma.zone.findUniqueOrThrow({
      where: { id: input.zoneId },
      select: {
        sectors: {
          where: { isDeleted: SoftDelete.NotDeleted },
          select: {
            id: true,
            name: true,
            sectorKind: true,
            zoneId: true,
            _count: {
              select: {
                walls: {
                  where: {
                    topos: {
                      some: {
                        UserPhotoContestTopo: { some: { isSubmitted: true } },
                      },
                    },
                  },
                },
              },
            },
            walls: {
              where: { isDeleted: SoftDelete.NotDeleted },
              select: {
                name: true,
                id: true,
                topos: {
                  where: {
                    UserPhotoContestTopo: {
                      every: { userId: ctx.user.id, isSubmitted: true },
                    },
                  },
                  select: {
                    _count: { select: { UserPhotoContestTopo: true } },
                  },
                },
                _count: {
                  select: {
                    topos: {
                      where: {
                        UserPhotoContestTopo: { some: { isSubmitted: true } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const wallsWithImageNotSubmitted =
      await ctx.prisma.userPhotoContestTopo.findMany({
        where: { userId: ctx.user.id, isSubmitted: false, Topo: { image: {} } },
        select: {
          Topo: {
            select: {
              Wall: { select: { id: true, Sector: { select: { id: true } } } },
            },
          },
        },
      });

    const sectorsWithCompletion = zones.sectors.map((sector) => {
      const numberWalls = sector.walls.length;

      const notUploadedImage = !!wallsWithImageNotSubmitted.find(
        (wall) => wall.Topo.Wall.Sector.id === sector.id,
      );

      const numberOfToposSubmitted = sector.walls.reduce(
        (acc, wall) => acc + wall._count.topos,
        0,
      );

      const numberOfSubmittedToposByUser = sector.walls.reduce(
        (acc, wall) =>
          acc + (wall.topos.at(0)?._count?.UserPhotoContestTopo || 0),
        0,
      );
      const completion = (numberOfSubmittedToposByUser / numberWalls) * 100;
      const walls = sector.walls.map((wall) => {
        const notUploadedImage = !!wallsWithImageNotSubmitted.find(
          (wallWithImageNotSubmitted) =>
            wallWithImageNotSubmitted.Topo.Wall.id === wall.id,
        );

        const submittedTopos =
          wall.topos.at(0)?._count?.UserPhotoContestTopo || 0;
        const hasSubmitted = submittedTopos > 0;

        return { ...wall, hasSubmitted, notUploadedImage };
      });
      return {
        ...sector,
        notUploadedImage,
        walls,
        completion,
        numberOfToposSubmitted,
      };
    });
    return {
      ...zones,
      sectors: sectorsWithCompletion,
    };
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
  uploadImageTopo: protectedProcedure
    .input(
      z
        .object({ image: image.schema })
        .and(wall.id)
        .and(z.object({ wallName: z.string() }))
        .and(z.object({ userPhotoContestTopoId: z.string().optional() })),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.userPhotoContestTopoId) {
        const updatedTopo = await ctx.prisma.userPhotoContestTopo.update({
          where: { id: input.userPhotoContestTopoId },
          data: { Topo: { update: { image: { create: input.image } } } },
        });
        return updatedTopo;
      }

      const createTopo = await ctx.prisma.userPhotoContestTopo.create({
        data: {
          User: { connect: { id: ctx.user.id } },
          Topo: {
            create: {
              Author: { connect: { id: ctx.user.id } },
              Wall: { connect: { id: input.wallId } },
              slug: `${slug(input.wallName)}-topo`,
              name: `${input.wallName} topo`,
              image: { create: input.image },
            },
          },
        },
      });

      return createTopo;
    }),

  getUserTopoSubmission: protectedProcedure
    .input(wall.id)
    .query(({ ctx, input }) => {
      return ctx.prisma.userPhotoContestTopo.findFirst({
        where: {
          Topo: { wallId: input.wallId },
          userId: ctx.user.id,
        },
        include: {
          User: { select: { username: true, profilePhoto: true } },
          Topo: {
            select: {
              image: true,
              Wall: {
                select: {
                  name: true,
                  Sector: {
                    select: { name: true, Zone: { select: { name: true } } },
                  },
                },
              },
            },
          },
        },
      });
    }),
  getUserTopoSubmissionById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.userPhotoContestTopo.findFirst({
        where: { id: input.id },
        include: { Topo: { select: { image: true } } },
      });
    }),
  submitTopo: protectedProcedure
    .input(z.object({ userPhotoContestTopoId: z.string() }))
    .mutation(({ ctx, input }) => {
      const isSubmitted = ctx.prisma.userPhotoContestTopo.update({
        where: { id: input.userPhotoContestTopoId },
        data: { isSubmitted: true },
      });
      return isSubmitted;
    }),
  usersParticipating: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.userPhotoContestTopo.groupBy({
      by: ["userId"],
      where: { isSubmitted: true },
      _count: { isSubmitted: true },
      _max: { updatedAt: true },
    });

    if (!users.length) return [];

    const userInfo = await ctx.prisma.user.findMany({
      where: {
        id: { in: users.map((user) => user.userId) },
      },
      select: {
        id: true,
        name: true,
        username: true,
        profilePhoto: true,
      },
    });

    const usersWithInfo = userInfo
      .map((user) => {
        const submissions = users.find((u) => u.userId === user.id);
        if (!submissions) throw new Error("Submissions not found");
        return {
          ...user,
          submissionsCount: submissions?._count.isSubmitted,
          latestSubmission: submissions?._max.updatedAt,
        };
      })
      .sort((a, b) => b.submissionsCount - a.submissionsCount);

    return usersWithInfo;
  }),
  userHasShared: protectedProcedure
    .input(z.object({ submissionId: z.string() }))
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.userSharedPhotoContestTopo.create({
        data: { UserPhotoContestTopo: { connect: { id: input.submissionId } } },
      }),
    ),
});
