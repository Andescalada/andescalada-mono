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
});
