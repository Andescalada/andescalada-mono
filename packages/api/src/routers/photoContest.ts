import image from "@andescalada/api/schemas/image";
import wall from "@andescalada/api/schemas/wall";
import zone from "@andescalada/api/schemas/zone";
import { t } from "@andescalada/api/src/createRouter";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@andescalada/db";
import { z } from "zod";

export const photoContestRouter = t.router({
  getCurrentContest: protectedProcedure.query(async ({ ctx }) => {
    const contest = await ctx.prisma.photoContest.findFirst({
      orderBy: { starting: "asc" },
      take: 1,
      include: { Zones: { select: { name: true, id: true } } },
    });

    if (!contest) throw new Error("No contest found");

    const today = new Date();

    const daysLeft = Math.max(
      (contest?.ending?.getTime() - today.getTime()) / (1000 * 3600 * 24),
      0,
    );

    return { ...contest, daysLeft };
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
    .query(async ({ ctx, input }) => {
      const usersWhoSubmitted = await ctx.prisma.userPhotoContestTopo.groupBy({
        by: ["userId"],
        where: { Topo: { wallId: input.wallId }, isSubmitted: true },
        _max: { updatedAt: true },
      });

      const users = await ctx.prisma.user.findMany({
        where: {
          id: { in: usersWhoSubmitted.map((user) => user.userId) },
        },
        select: {
          id: true,
          name: true,
          username: true,
          profilePhoto: true,
        },
      });
      return users;
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
        .and(z.object({ wallName: z.string() })),
    )
    .mutation(async ({ ctx, input }) => {
      const existingSubmission =
        await ctx.prisma.userPhotoContestTopo.findFirst({
          where: {
            userId: ctx.user.id,
            Topo: { wallId: input.wallId },
          },
        });

      if (existingSubmission?.id) {
        const updatedTopo = await ctx.prisma.userPhotoContestTopo.update({
          where: { id: existingSubmission.id },
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
              id: true,
              image: true,
              RoutePath: selectRoutePath,
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
  submittedPhotos: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.date().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const items = await ctx.prisma.userPhotoContestTopo.findMany({
        where: { isSubmitted: true },
        take: limit + 1,
        cursor: cursor ? { createdAt: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          createdAt: true,
          Topo: {
            include: {
              ...includeInTopo,
              Wall: {
                include: {
                  Sector: {
                    include: { Zone: { select: { name: true, id: true } } },
                  },
                },
              },
            },
          },
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
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.createdAt;
      }
      return {
        items,
        nextCursor,
      };
    }),
});

const selectRoutePath = {
  where: {
    Route: {
      AND: [
        { isDeleted: SoftDelete.NotDeleted },
        {
          OR: [
            {
              Pitch: {
                MultiPitch: {
                  isDeleted: SoftDelete.NotDeleted,
                },
              },
            },

            { Pitch: null },
          ],
        },
        {
          OR: [
            {
              Pitch: { isDeleted: SoftDelete.NotDeleted },
            },
            { Pitch: null },
          ],
        },
      ],
    },
  },
  orderBy: { Route: { Pitch: { number: "desc" as const } } },
  include: {
    Route: {
      select: {
        id: true,
        position: true,
        extendedRouteId: true,
        variantRouteId: true,
        kind: true,
        name: true,
        RouteGrade: true,
        Pitch: { select: { number: true } },
      },
    },
  },
};
