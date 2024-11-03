import { includeInMultiPitch } from "@andescalada/api/src/routers/multiPitch/byId";
import { includeInRoute } from "@andescalada/api/src/routers/routes/byIdWithEvaluation";
import { selectFromSectorAllWalls } from "@andescalada/api/src/routers/sectors";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import { includeInWallById } from "@andescalada/api/src/routers/walls";
import { selectZoneAllSectors } from "@andescalada/api/src/routers/zones/allSectors";
import parseMultiPitch from "@andescalada/api/src/utils/parseMultiPitch";
import { ProtectedContext } from "@andescalada/api/src/utils/protectedProcedure";
import { SoftDelete } from "@andescalada/db";
import { z } from "zod";

const imageSchema = z.object({
  id: z.string(),
  height: z.number(),
  width: z.number(),
  url: z.string(),
  publicId: z.string().nullable(),
});

type ImageToDownload = z.infer<typeof imageSchema>;

export enum AssetsToDownload {
  Routes = "routes.byIdWithEvaluation",
  MultiPitch = "multiPitch.byId",
  Topos = "topos.byId",
  Walls = "walls.byId",
  Sectors = "sectors.allWalls",
  Zones = "zones.allSectors",
}

export const AssetsToUpdate = z.array(
  z.object({
    zoneId: z.string(),
    assetId: z.string(),
    version: z.number(),
  }),
);

const getOfflineAssets = async ({
  ctx,
  input,
}: {
  ctx: ProtectedContext;
  input: { zoneId: string; assetsToUpdate?: typeof AssetsToUpdate._type };
}) => {
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
      Author: { select: { id: true } },
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
    include: includeInMultiPitch,
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
    select: selectZoneAllSectors({ userId: ctx.user.id, zoneId: input.zoneId }),
  });

  const [
    routesResults,
    toposResults,
    wallsResults,
    sectorsResults,
    zonesResults,
    multiPitchResults,
  ] = await Promise.all([routes, topos, walls, sectors, zones, multiPitch]);

  const parsedRoutes = routesResults
    .map((route) => {
      const evaluation = {
        average:
          route.RouteEvaluation.reduce(
            (acc, curr) => acc + Number(curr.evaluation || 0),
            0,
          ) / (route.RouteEvaluation.length || 1),
        count: route.RouteEvaluation.length,
      };

      const gradeEvaluation = {
        average:
          route.RouteGradeEvaluation.reduce(
            (acc, curr) => acc + Number(curr.evaluation || 0),
            0,
          ) / (route.RouteGradeEvaluation.length || 1),
        count: route.RouteGradeEvaluation.length,
      };

      const userEvaluationDecimal = route.RouteEvaluation.find(
        (evaluation) => evaluation.User.id === ctx.user.id,
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
        assetId: `${AssetsToDownload.Routes}/${route.id}` as const,
        zoneId: route.Wall.Sector.zoneId,
        data,
        version: route.version,
      };
    })
    .filter((item) => {
      const existingAsset = input.assetsToUpdate?.find(
        (asset) => asset.assetId === item.assetId,
      );
      if (!existingAsset) return true;
      return item.version > existingAsset.version;
    });

  const parsedMultiPitch = multiPitchResults
    .map((multiPitch) => {
      return {
        router: "multiPitch" as const,
        procedure: "byId" as const,
        params: {
          multiPitchId: multiPitch.id,
          zoneId: input.zoneId,
        },
        assetId: `${AssetsToDownload.MultiPitch}/${multiPitch.id}` as const,
        zoneId: input.zoneId,
        data: multiPitch,
        version: multiPitch.version,
      };
    })
    .filter((item) => {
      const existingAsset = input.assetsToUpdate?.find(
        (asset) => asset.assetId === item.assetId,
      );
      if (!existingAsset) return true;

      return item.version > existingAsset.version;
    });

  const imagesToDownload: ImageToDownload[] = [];

  const parsedTopos = toposResults
    .map((topo) => {
      if (topo.image) imagesToDownload.push(imageSchema.parse(topo.image));
      return {
        router: "topos" as const,
        procedure: "byId" as const,
        params: { topoId: topo.id, zoneId: topo.Wall.Sector.zoneId },
        assetId: `${AssetsToDownload.Topos}/${topo.id}` as const,
        zoneId: topo.Wall.Sector.zoneId,
        data: topo,
        version: topo.version,
      };
    })
    .filter((item) => {
      const existingAsset = input.assetsToUpdate?.find(
        (asset) => asset.assetId === item.assetId,
      );
      if (!existingAsset) return true;

      return item.version > existingAsset.version;
    });

  const parsedWalls = wallsResults
    .map((wall) => {
      const MultiPitch = parseMultiPitch(wall.MultiPitch);
      return {
        router: "walls" as const,
        procedure: "byId" as const,
        params: { wallId: wall.id, zoneId: wall.Sector.zoneId },
        assetId: `${AssetsToDownload.Walls}/${wall.id}` as const,
        zoneId: wall.Sector.zoneId,
        data: { ...wall, MultiPitch },
        version: wall.version,
      };
    })
    .filter((item) => {
      const existingAsset = input.assetsToUpdate?.find(
        (asset) => asset.assetId === item.assetId,
      );
      if (!existingAsset) return true;

      return item.version > existingAsset.version;
    });

  const parsedSectors = sectorsResults
    .map((sector) => ({
      router: "sectors" as const,
      procedure: "allWalls" as const,
      params: { sectorId: sector.id, zoneId: sector.zoneId },
      assetId: `${AssetsToDownload.Sectors}/${sector.id}` as const,
      zoneId: sector.zoneId,
      data: sector,
      version: sector.version,
    }))
    .filter((item) => {
      const existingAsset = input.assetsToUpdate?.find(
        (asset) => asset.assetId === item.assetId,
      );
      if (!existingAsset) return true;

      return item.version > existingAsset.version;
    });

  const parsedZone = zonesResults
    .map((zone) => {
      if (zone.coverPhoto) {
        imagesToDownload.push(imageSchema.parse(zone.coverPhoto));
      }
      return {
        router: "zones" as const,
        procedure: "allSectors" as const,
        params: { zoneId: zone.id },
        assetId: `${AssetsToDownload.Zones}/${zone.id}` as const,
        zoneId: zone.id,
        data: {
          ...zone,
          hasAccess: true,
          isDownloaded: zone.DownloadedBy.length > 0,
          isFavorite: zone.FavoritedBy.length > 0,
        },
        version: zone.version,
      };
    })
    .filter((item) => {
      const existingAsset = input.assetsToUpdate?.find(
        (asset) => asset.assetId === item.assetId,
      );
      if (!existingAsset) return true;

      return item.version > existingAsset.version;
    });

  const location = parsedZone.length ? parsedZone[0].data.Location : null;

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

  return { assets, imagesToDownload, assetList, location };
};

export default getOfflineAssets;
