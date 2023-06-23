import error from "@andescalada/api/src/utils/errors";
import { ProtectedZoneContext } from "@andescalada/api/src/utils/protectedZoneProcedure";
import {
  GradeSystems,
  InfoAccess,
  RouteKind,
  SoftDelete,
  Wall,
  Zone,
} from "@andescalada/db";
import { TRPCError } from "@trpc/server";

const Route = {
  name: true,
  id: true,
  RouteGrade: true,
  position: true,
  kind: true,
  isDeleted: true,
  unknownName: true,
  wallId: true,
  Author: { select: { email: true } },
};

const parsedWall = async ({
  ctx,
  wallId,
  zoneId,
}: {
  ctx: ProtectedZoneContext;
  wallId: Wall["id"];
  zoneId: Zone["id"];
}) => {
  const wall = await ctx.prisma.wall.findUnique({
    where: { id: wallId },
    include: {
      Sector: {
        select: {
          zoneId: true,
          sectorKind: true,
          Zone: { select: { infoAccess: true } },
        },
      },
      routes: {
        orderBy: { position: "asc" },

        where: {
          isDeleted: { equals: SoftDelete.NotDeleted },
          extendedRouteId: { equals: null },
          Pitch: { is: null },
        },
        select: {
          ...Route,
          Pitch: {
            include: { MultiPitch: { select: { name: true, id: true } } },
          },
          Extension: {
            where: { isDeleted: SoftDelete.NotDeleted },
            select: Route,
          },
        },
      },
      MultiPitch: {
        where: { isDeleted: SoftDelete.NotDeleted },
        select: {
          id: true,
          name: true,
          position: true,
          Author: { select: { email: true } },
          wallId: true,
          Pitches: {
            where: { isDeleted: SoftDelete.NotDeleted },
            select: { Route: { select: { RouteGrade: true, kind: true } } },
          },
        },
      },
      topos: {
        where: { main: true, isDeleted: SoftDelete.NotDeleted },
        take: 1,
        select: {
          id: true,
          image: true,
          name: true,
          routeStrokeWidth: true,
        },
      },
    },
  });

  if (!wall) {
    throw new TRPCError(error.wallNotFound(wallId));
  }

  if (
    !ctx.permissions.has("Read") &&
    wall.Sector.Zone.infoAccess !== InfoAccess.Public
  ) {
    throw new TRPCError(error.unauthorizedActionForZone(zoneId, "Read"));
  }

  const parsedMultiPitch = wall.MultiPitch.map((mp) => {
    const reduce = mp.Pitches.reduce<{
      maxGrade: number;
      project: boolean;
      maxAid?: number;
      gradeRouteKind: RouteKind;
      originalGradeSystem: GradeSystems;
    }>(
      (prev, current) => {
        const currentGrade = Number(current.Route.RouteGrade?.grade ?? 0);
        const aidValue =
          current.Route.RouteGrade?.originalGradeSystem === GradeSystems.Aid
            ? Number(current.Route.RouteGrade?.grade ?? 0)
            : undefined;
        return {
          maxGrade: Math.max(prev.maxGrade, currentGrade),
          gradeRouteKind:
            prev.maxGrade > currentGrade
              ? prev.gradeRouteKind
              : current.Route.kind,
          originalGradeSystem:
            currentGrade > prev.maxGrade &&
            current.Route.RouteGrade?.originalGradeSystem !== undefined
              ? current.Route.RouteGrade?.originalGradeSystem
              : prev.originalGradeSystem,

          project: prev.project || !!current.Route.RouteGrade?.project,
          maxAid: [prev.maxAid, aidValue].every((v) => v === undefined)
            ? undefined
            : Math.max(Number(prev.maxAid ?? 0), Number(aidValue ?? 0)),
        };
      },
      {
        maxGrade: 0,
        gradeRouteKind: "Sport",
        project: false,
        originalGradeSystem: GradeSystems.Yosemite,
        maxAid: undefined,
      },
    );

    return {
      id: mp.id,
      name: mp.name,
      position: mp.position,
      wallId: mp.wallId,
      Author: mp.Author,
      numberOfPitches: mp.Pitches.length,
      gradeRouteKind: reduce.gradeRouteKind,
      grade: reduce.maxGrade === 0 ? null : reduce.maxGrade,
      project: false,
      originalGradeSystem: reduce.originalGradeSystem,
      maxAid: reduce.maxAid,
    };
  });
  const parsedWall = { ...wall, MultiPitch: parsedMultiPitch };
  return parsedWall;
};

export default parsedWall;
