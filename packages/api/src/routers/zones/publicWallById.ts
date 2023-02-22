import { t } from "@andescalada/api/src/createRouter";
import { InfoAccess, SoftDelete, Status } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const publicWallById = t.procedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const wall = await ctx.prisma.wall.findUnique({
      where: { id: input },
      include: {
        Sector: {
          select: {
            name: true,
            Zone: {
              select: {
                infoAccess: true,
                currentStatus: true,
                name: true,
                slug: true,
                id: true,
              },
            },
          },
        },
        routes: {
          where: { isDeleted: SoftDelete.NotDeleted },
          orderBy: { position: "asc" },
          include: { RouteGrade: true },
        },
        topos: {
          where: { isDeleted: SoftDelete.NotDeleted },
          include: {
            image: true,
            RoutePath: {
              where: {
                OR: {
                  isDeleted: SoftDelete.NotDeleted,
                  Route: { isDeleted: SoftDelete.NotDeleted },
                },
              },
              include: {
                Route: {
                  select: {
                    name: true,
                    id: true,
                    position: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (
      !wall ||
      wall.isDeleted !== SoftDelete.NotDeleted ||
      wall.Sector.Zone.currentStatus !== Status.Published
    ) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No wall with id '${input}'`,
      });
    }
    const { infoAccess } = wall.Sector.Zone;
    if (infoAccess !== InfoAccess.Public) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `Wall with id '${input}' has infoAccess '${infoAccess}'`,
      });
    }
    return wall;
  });

export default publicWallById;
