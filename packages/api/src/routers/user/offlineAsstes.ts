import { AppRouter } from "@andescalada/api/src/routers/_app";
import { includeInRoute } from "@andescalada/api/src/routers/routes/byIdWithEvaluation";
import { selectFromSectorAllWalls } from "@andescalada/api/src/routers/sectors";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import { includeInWallById } from "@andescalada/api/src/routers/walls";
import { selectZoneAllSectors } from "@andescalada/api/src/routers/zones/allSectors";
import parseMultiPitch from "@andescalada/api/src/utils/parseMultiPitch";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { SoftDelete } from "@prisma/client";
import { inferProcedureOutput } from "@trpc/server";
const idAndVersion = { id: true, version: true };

type ZoneAllSectors = inferProcedureOutput<AppRouter["zones"]["allSectors"]>;
type SectorAllWalls = inferProcedureOutput<AppRouter["sectors"]["allWalls"]>;
type WallById = inferProcedureOutput<AppRouter["walls"]["byId"]>;
type ToposById = inferProcedureOutput<AppRouter["topos"]["byId"]>;
type RouteByIdWithEvaluation = inferProcedureOutput<
  AppRouter["routes"]["byIdWithEvaluation"]
>;

const offlineAssets = protectedProcedure.query(async ({ ctx }) => {
  const routes = ctx.prisma.route.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Wall: {
        Sector: {
          Zone: { DownloadedBy: { some: { email: ctx.user.email } } },
        },
      },
    },

    include: {
      ...includeInRoute,
      RouteGradeEvaluation: { select: { evaluation: true } },
      RouteEvaluation: { select: { evaluation: true } },
      Author: { select: { email: true } },
    },
  });

  const topos = ctx.prisma.topo.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Wall: {
        Sector: {
          Zone: { DownloadedBy: { some: { email: ctx.user.email } } },
        },
      },
    },
    include: { ...includeInTopo, Wall: { include: { Sector: true } } },
  });

  const walls = ctx.prisma.wall.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Sector: { Zone: { DownloadedBy: { some: { email: ctx.user.email } } } },
    },
    include: includeInWallById,
  });

  const sectors = ctx.prisma.sector.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Zone: { DownloadedBy: { some: { email: ctx.user.email } } },
    },
    select: selectFromSectorAllWalls,
  });

  const zones = ctx.prisma.zone.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      DownloadedBy: { some: { email: ctx.user.email } },
    },
    select: selectZoneAllSectors({ userEmail: ctx.user.email }),
  });

  const [
    routesResults,
    toposResults,
    wallsResults,
    sectorsResults,
    zonesResults,
  ] = await ctx.prisma.$transaction([routes, topos, walls, sectors, zones]);

  const parsedRoutes: {
    queryId: "routes.byIdWithEvaluation";
    zoneId: string;
    data: RouteByIdWithEvaluation;
    version: number;
  }[] = routesResults.map((route) => {
    const evaluation = {
      average:
        route.RouteEvaluation.reduce(
          (acc, curr) => acc + Number(curr.evaluation),
          0,
        ) / route.RouteEvaluation.length,
      count: route.RouteEvaluation.length,
    };

    const gradeEvaluation = {
      average:
        route.RouteGradeEvaluation.reduce(
          (acc, curr) => acc + Number(curr.evaluation),
          0,
        ) / route.RouteGradeEvaluation.length,
      count: route.RouteGradeEvaluation.length,
    };

    const mainTopo = route.Wall.topos[0];
    const description = route.description?.originalText;
    const length = route.RouteLength?.length
      ? Number(route.RouteLength.length)
      : null;

    const data = {
      ...route,
      mainTopo,
      description,
      length,
      evaluation,
      gradeEvaluation,
    };

    return {
      queryId: "routes.byIdWithEvaluation",
      zoneId: route.Wall.Sector.zoneId,
      data,
      version: route.version,
    };
  });

  const parsedTopos: {
    queryId: "topos.byId";
    zoneId: string;
    version: number;
    data: ToposById;
  }[] = toposResults.map((topo) => ({
    queryId: "topos.byId",
    zoneId: topo.Wall.Sector.zoneId,
    data: topo,
    version: topo.version,
  }));

  const parsedWalls: {
    queryId: "walls.byId";
    zoneId: string;
    version: number;
    data: WallById;
  }[] = wallsResults.map((wall) => {
    const MultiPitch = parseMultiPitch(wall.MultiPitch);
    return {
      queryId: "walls.byId",
      zoneId: wall.Sector.zoneId,
      data: { ...wall, MultiPitch },
      version: wall.version,
    };
  });

  const parsedSectors: {
    queryId: "sectors.allWalls";
    zoneId: string;
    version: number;
    data: SectorAllWalls;
  }[] = sectorsResults.map((sector) => ({
    queryId: "sectors.allWalls",
    zoneId: sector.zoneId,
    data: sector,
    version: sector.version,
  }));

  const parsedZone: {
    queryId: "zones.allSectors";
    zoneId: string;
    version: number;
    data: ZoneAllSectors;
  }[] = zonesResults.map((zone) => ({
    queryId: "zones.allSectors",
    zoneId: zone.id,
    data: {
      ...zone,
      hasAccess: true,
      isDownloaded: zone.DownloadedBy.length > 0,
      isFavorite: zone.FavoritedBy.length > 0,
    },
    version: zone.version,
  }));

  return [
    ...parsedRoutes,
    parsedTopos,
    ...parsedWalls,
    parsedSectors,
    parsedZone,
  ];
});

export default offlineAssets;
