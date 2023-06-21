import { Location } from "@prisma/client";
import Mapbox from "@rnmapbox/maps";
import { Dimensions } from "react-native";
import Sentry from "sentry-expo";

const downloadMapboxOffline = async ({
  location,
  packName,
}: {
  location: Location;
  packName: string;
}) => {
  const pack = await Mapbox.offlineManager.getPack(packName);
  if (pack) {
    await Mapbox.offlineManager.invalidatePack(pack.name);
    return;
  }
  const aspectRatio = 16 / 9;
  const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
  const centerLat = Number(location.latitude);
  const centerLong = Number(location.longitude);

  const latDistance = (screenHeight / screenWidth) * 2 * 90;
  const longDistance = (1 / aspectRatio) * latDistance;

  const neLng = centerLong - longDistance / 2;
  const neLat = centerLat + latDistance / 2;
  const swLng = centerLat - latDistance / 2;
  const swLat = centerLong + longDistance / 2;

  await Mapbox.offlineManager.createPack(
    {
      name: packName,
      styleURL: Mapbox.StyleURL.Satellite,
      bounds: [
        [neLng, neLat],
        [swLng, swLat],
      ],
      minZoom: 10,
      maxZoom: 16,
    },
    (offlinePack, progress) => {
      Sentry.Native.captureMessage(
        `Downloading ${packName}, ${progress.percentage}`,
      );
    },
    (_, error) => {
      throw new Error(error.message);
    },
  );
};

export default downloadMapboxOffline;
