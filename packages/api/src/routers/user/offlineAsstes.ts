import { includeInRoute } from "@andescalada/api/src/routers/routes/byIdWithEvaluation";
import { selectFromSectorAllWalls } from "@andescalada/api/src/routers/sectors";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import { includeInWallById } from "@andescalada/api/src/routers/walls";
import { selectZoneAllSectors } from "@andescalada/api/src/routers/zones/allSectors";
import parseMultiPitch from "@andescalada/api/src/utils/parseMultiPitch";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@prisma/client";

interface ImageToDownload {
  id: string;
  height: number;
  width: number;
  url: string;
  publicId: string | null;
}

const offlineAssets = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const routes = ctx.prisma.route.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Wall: {
        Sector: {
          Zone: {
            id: input.zoneId,
          },
        },
      },
    },

    include: {
      ...includeInRoute,
      RouteGradeEvaluation: { select: { evaluation: true } },
      RouteEvaluation: { select: { evaluation: true, User: true } },
      Author: { select: { email: true } },
    },
  });

  const multiPitch = ctx.prisma.multiPitch.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Wall: {
        Sector: {
          Zone: {
            id: input.zoneId,
          },
        },
      },
    },
  });

  const topos = ctx.prisma.topo.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Wall: {
        Sector: {
          Zone: {
            id: input.zoneId,
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
        Zone: {
          id: input.zoneId,
        },
      },
    },
    include: includeInWallById,
  });

  const sectors = ctx.prisma.sector.findMany({
    where: {
      isDeleted: SoftDelete.NotDeleted,
      Zone: {
        id: input.zoneId,
      },
    },
    select: selectFromSectorAllWalls,
  });

  const zones = ctx.prisma.zone.findMany({
    where: {
      id: input.zoneId,
      isDeleted: SoftDelete.NotDeleted,
    },
    select: selectZoneAllSectors({ userEmail: ctx.user.email }),
  });

  const [
    routesResults,
    toposResults,
    wallsResults,
    sectorsResults,
    zonesResults,
    multiPitchResults,
  ] = await ctx.prisma.$transaction([
    routes,
    topos,
    walls,
    sectors,
    zones,
    multiPitch,
  ]);

  const parsedRoutes = routesResults.map((route) => {
    const evaluation = {
      average:
        route.RouteEvaluation.reduce(
          (acc, curr) => acc + Number(curr.evaluation || 0),
          0,
        ) / route.RouteEvaluation.length,
      count: route.RouteEvaluation.length,
    };

    const gradeEvaluation = {
      average:
        route.RouteGradeEvaluation.reduce(
          (acc, curr) => acc + Number(curr.evaluation || 0),
          0,
        ) / route.RouteGradeEvaluation.length,
      count: route.RouteGradeEvaluation.length,
    };

    const userEvaluationDecimal = route.RouteEvaluation.find(
      (evaluation) => evaluation.User.email === ctx.user.email,
    )?.evaluation;

    const userEvaluation = userEvaluationDecimal
      ? Number(userEvaluationDecimal)
      : 0;

    const mainTopo = route.Wall.topos[0];
    const description = route.description?.originalText;
    const length = route.RouteLength?.length
      ? Number(route.RouteLength.length)
      : null;

    const data = {
      ...route,
      RouteEvaluation: null,
      RouteGradeEvaluation: null,
      mainTopo,
      description,
      length,
      evaluation,
      gradeEvaluation,
      userEvaluation,
    };

    return {
      router: "routes" as const,
      procedure: "byIdWithEvaluation" as const,
      params: { routeId: route.id, zoneId: route.Wall.Sector.zoneId },
      assetId: `routes.byIdWithEvaluation/${route.id}`,
      zoneId: route.Wall.Sector.zoneId,
      data,
      version: route.version,
    };
  });

  const parsedMultiPitch = multiPitchResults.map((multiPitch) => {
    return {
      router: "multiPitch" as const,
      procedure: "byId" as const,
      params: {
        multiPitchId: multiPitch.id,
        zoneId: input.zoneId,
      },
      assetId: `multiPitch.byId/${multiPitch.id}`,
      zoneId: input.zoneId,
      data: multiPitch,
      version: multiPitch.version,
    };
  });

  const imagesToDownload: ImageToDownload[] = [];

  const parsedTopos = toposResults.map((topo) => {
    if (topo.image) imagesToDownload.push({ ...topo.image });
    return {
      router: "topos" as const,
      procedure: "byId" as const,
      params: { topoId: topo.id, zoneId: topo.Wall.Sector.zoneId },
      assetId: `topos.byId/${topo.id}`,
      zoneId: topo.Wall.Sector.zoneId,
      data: topo,
      version: topo.version,
    };
  });

  const parsedWalls = wallsResults.map((wall) => {
    const MultiPitch = parseMultiPitch(wall.MultiPitch);
    return {
      router: "walls" as const,
      procedure: "byId" as const,
      params: { wallId: wall.id, zoneId: wall.Sector.zoneId },
      assetId: `walls.byId/${wall.id}`,
      zoneId: wall.Sector.zoneId,
      data: { ...wall, MultiPitch },
      version: wall.version,
    };
  });

  const parsedSectors = sectorsResults.map((sector) => ({
    router: "sectors" as const,
    procedure: "allWalls" as const,
    params: { sectorId: sector.id, zoneId: sector.zoneId },
    assetId: `sectors.allWalls/${sector.id}`,
    zoneId: sector.zoneId,
    data: sector,
    version: sector.version,
  }));

  const parsedZone = zonesResults.map((zone) => ({
    router: "zones" as const,
    procedure: "allSectors" as const,
    params: { zoneId: zone.id },
    assetId: `zones.allSectors/${zone.id}`,
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
    ...parsedMultiPitch,
    ...parsedTopos,
    ...parsedWalls,
    ...parsedSectors,
    ...parsedZone,
  ];

  const assetList = assets.map((asset) => {
    const { router, params, procedure, version, zoneId, assetId } = asset;
    return { router, params, procedure, version, zoneId, assetId };
  });

  return { assets, imagesToDownload, assetList };
});

export default offlineAssets;
