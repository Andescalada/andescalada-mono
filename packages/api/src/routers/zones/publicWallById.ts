import { t } from "@andescalada/api/src/createRouter";
import { MULTI_PITCH } from "@andescalada/api/src/types/constants";
import { InfoAccess, SoftDelete, Status } from "@andescalada/db";
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
        MultiPitch: {
          where: { isDeleted: SoftDelete.NotDeleted },
          orderBy: { position: "asc" },
          include: {
            Pitches: { include: { Route: { include: { RouteGrade: true } } } },
          },
        },
        routes: {
          where: { isDeleted: SoftDelete.NotDeleted },
          orderBy: { position: "asc" },
          include: { RouteGrade: true, Pitch: true },
        },
        topos: {
          where: { isDeleted: SoftDelete.NotDeleted },
          include: {
            image: true,
            RoutePath: {
              where: {
                AND: [
                  { isDeleted: SoftDelete.NotDeleted },
                  { Route: { isDeleted: SoftDelete.NotDeleted } },
                ],
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

    const filteredRoutes = wall.routes
      .filter((r) => !r.Pitch)
      .map(({ id, name, RouteGrade, position, kind }) => ({
        id,
        name,
        RouteGrade,
        position,
        kind,
        type: "Route" as const,
      }));

    const multiPitches = wall.MultiPitch.map(
      ({ id, name, Pitches, position }) => {
        const multiPitchGrade = Pitches.map(
          (pitch) => pitch.Route.RouteGrade,
        ).reduce((prev, curr) => {
          if (!curr) return prev;
          if (!prev) return null;

          if (curr.project) {
            return curr;
          }

          if (prev.grade === null) {
            return curr;
          }

          if (typeof curr.grade === "number") {
            if (prev.grade > curr.grade) {
              return prev;
            }
            return curr;
          }

          return null;
        });

        const kind = Pitches.find(
          (pitch) => pitch.Route.id === multiPitchGrade?.routeId,
        )?.Route.kind;

        return {
          id,
          name,
          RouteGrade: multiPitchGrade,
          position,
          kind: kind!,
          type: MULTI_PITCH,
        };
      },
    );

    const routes = [...filteredRoutes, ...multiPitches].sort(
      (a, b) => a.position - b.position,
    );

    return { ...wall, routes };
  });

export default publicWallById;
