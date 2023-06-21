import geoViewport from "@mapbox/geo-viewport";
import { Location } from "@prisma/client";
import Mapbox from "@rnmapbox/maps";
import { Dimensions } from "react-native";
import { z } from "zod";

const downloadMapboxOffline = async ({
  location,
  packName,
}: {
  location: Location;
  packName: string;
}) => {
  const pack = await Mapbox.offlineManager.getPack(packName);

  if (pack) {
    if (pack) {
      await Mapbox.offlineManager.invalidatePack(pack.name);
      return;
    }
  }

  const { width, height } = Dimensions.get("window");
  console.log("center", [
    Number(location.longitude),
    Number(location.latitude),
  ]);
  const rawBounds = geoViewport.bounds(
    [Number(location.longitude), Number(location.latitude)],
    11,
    [width, height],
    512,
  );

  const bounds = z.array(z.number()).parse(rawBounds);

  console.log(bounds);

  await Mapbox.offlineManager.createPack(
    {
      name: packName,
      styleURL: Mapbox.StyleURL.SatelliteStreet,
      bounds: [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      minZoom: 13,
      maxZoom: 15,
    },
    (offlinePack, progress) => {
      console.info(
        `Downloaded ${offlinePack.name} --> ${progress.percentage}%`,
      );
    },
    (_, error) => {
      throw new Error(error.message);
    },
  );
};

export default downloadMapboxOffline;
