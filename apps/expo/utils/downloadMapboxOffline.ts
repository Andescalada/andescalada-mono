import geoViewport from "@mapbox/geo-viewport";
import { Location } from "@andescalada/db";
import Mapbox from "@rnmapbox/maps";
import { Dimensions } from "react-native";
import type { DefaultVariants } from "react-native-notificated/lib/typescript/defaultConfig/types";
import type { Emmiter } from "react-native-notificated/lib/typescript/types";
import { z } from "zod";

const downloadMapboxOffline = async ({
  location,
  packName,
  notification,
}: {
  location: Location;
  packName: string;
  notification: Emmiter<DefaultVariants>;
}) => {
  const pack = await Mapbox.offlineManager.getPack(packName);

  if (pack) return;

  const { width, height } = Dimensions.get("window");

  const rawBounds = geoViewport.bounds(
    [Number(location.longitude), Number(location.latitude)],
    11,
    [width, height],
    512,
  );

  const bounds = z.array(z.number()).parse(rawBounds);

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
      if (progress.percentage === 100) {
        notification.notify("success", {
          params: {
            title: "Mapa descargado con éxito",
          },
        });
      }
    },
    (_, error) => {
      notification.notify("error", {
        params: {
          title: "No se pudo descargar el mapa",
          description: `${error.message}`,
        },
      });
      throw new Error(error.message);
    },
  );
};

export default downloadMapboxOffline;
