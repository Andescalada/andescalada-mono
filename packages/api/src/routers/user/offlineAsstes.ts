import { AppRouter } from "@andescalada/api/src/routers/_app";
import { includeInRoute } from "@andescalada/api/src/routers/routes/byIdWithEvaluation";
import { selectFromSectorAllWalls } from "@andescalada/api/src/routers/sectors";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import { includeInWallById } from "@andescalada/api/src/routers/walls";
import { selectZoneAllSectors } from "@andescalada/api/src/routers/zones/allSectors";
import parseMultiPitch from "@andescalada/api/src/utils/parseMultiPitch";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { Image, SoftDelete } from "@prisma/client";
import { inferProcedureOutput } from "@trpc/server";

type ZoneAllSectors = inferProcedureOutput<AppRouter["zones"]["allSectors"]>;
type SectorAllWalls = inferProcedureOutput<AppRouter["sectors"]["allWalls"]>;
type WallById = inferProcedureOutput<AppRouter["walls"]["byId"]>;
type ToposById = inferProcedureOutput<AppRouter["topos"]["byId"]>;
type RouteByIdWithEvaluation = inferProcedureOutput<
  AppRouter["routes"]["byIdWithEvaluation"]
>;

const offlineAssets = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const routes = ctx.prisma.route.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Wall: {
        Sector: {
          Zone: {
            id: input.zoneId,
            DownloadedBy: { some: { email: ctx.user.email } },
          },
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
          Zone: {
            id: input.zoneId,
            DownloadedBy: { some: { email: ctx.user.email } },
          },
        },
      },
    },
    include: { ...includeInTopo, Wall: { include: { Sector: true } } },
  });

  const walls = ctx.prisma.wall.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Sector: {
        id: input.zoneId,
        Zone: { DownloadedBy: { some: { email: ctx.user.email } } },
      },
    },
    include: includeInWallById,
  });

  const sectors = ctx.prisma.sector.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Zone: {
        id: input.zoneId,
        DownloadedBy: { some: { email: ctx.user.email } },
      },
    },
    select: selectFromSectorAllWalls,
  });

  const zones = ctx.prisma.zone.findMany({
    where: {
      id: input.zoneId,
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
    router: "routes";
    procedure: "byIdWithEvaluation";
    params: { routeId: string; zoneId: string };
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
      router: "routes",
      procedure: "byIdWithEvaluation",
      params: { routeId: route.id, zoneId: route.Wall.Sector.zoneId },
      zoneId: route.Wall.Sector.zoneId,
      data,
      version: route.version,
    };
  });

  const imagesToDownload: Image[] = [];

  const parsedTopos: {
    router: "topos";
    procedure: "byId";
    params: { topoId: string; zoneId: string };
    zoneId: string;
    version: number;
    data: ToposById;
  }[] = toposResults.map((topo) => {
    if (topo.image) imagesToDownload.push({ ...topo.image });
    return {
      router: "topos",
      procedure: "byId",
      params: { topoId: topo.id, zoneId: topo.Wall.Sector.zoneId },
      zoneId: topo.Wall.Sector.zoneId,
      data: topo,
      version: topo.version,
    };
  });

  const parsedWalls: {
    router: "walls";
    procedure: "byId";
    params: { wallId: string; zoneId: string };
    zoneId: string;
    version: number;
    data: WallById;
  }[] = wallsResults.map((wall) => {
    const MultiPitch = parseMultiPitch(wall.MultiPitch);
    return {
      router: "walls",
      procedure: "byId",
      params: { wallId: wall.id, zoneId: wall.Sector.zoneId },
      zoneId: wall.Sector.zoneId,
      data: { ...wall, MultiPitch },
      version: wall.version,
    };
  });

  const parsedSectors: {
    router: "sectors";
    procedure: "allWalls";
    params: { sectorId: string };
    zoneId: string;
    version: number;
    data: SectorAllWalls;
  }[] = sectorsResults.map((sector) => ({
    router: "sectors",
    procedure: "allWalls",
    params: { sectorId: sector.id },
    zoneId: sector.zoneId,
    data: sector,
    version: sector.version,
  }));

  const parsedZone: {
    router: "zones";
    procedure: "allSectors";
    params: { zoneId: string };
    zoneId: string;
    version: number;
    data: ZoneAllSectors;
  }[] = zonesResults.map((zone) => ({
    router: "zones",
    procedure: "allSectors",
    params: { zoneId: zone.id },
    zoneId: zone.id,
    data: {
      ...zone,
      hasAccess: true,
      isDownloaded: zone.DownloadedBy.length > 0,
      isFavorite: zone.FavoritedBy.length > 0,
    },
    version: zone.version,
  }));

  const assets = [
    ...parsedRoutes,
    ...parsedTopos,
    ...parsedWalls,
    ...parsedSectors,
    ...parsedZone,
  ];

  return { assets, imagesToDownload };
});

export default offlineAssets;
