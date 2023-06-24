import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { downloadedAssetsListAtom, downloadedZonesAtom } from "@atoms/index";
import { useSaveImagesToFileSystem } from "@hooks/useSaveImagesToFileSystem";
import { inferProcedureOutput } from "@trpc/server";
import downloadMapboxOffline from "@utils/downloadMapboxOffline";
import { useNotifications } from "@utils/notificated";
import offlineDb from "@utils/quick-sqlite";
import { deviceName } from "expo-device";
import { atom, useAtom } from "jotai";
import { useState } from "react";

export const progressAtom = atom(0);

type Data = inferProcedureOutput<AppRouter["user"]["offlineAssets"]>;

const useSetAssetsToDb = () => {
  const setDownloadedAssetsList = useAtom(downloadedAssetsListAtom)[1];
  const setIsDownloadedZones = useAtom(downloadedZonesAtom)[1];

  const [isLoading, setIsLoading] = useState(false);

  const utils = trpc.useContext();

  const addToDownloadedList = trpc.user.addToDownloadedZones.useMutation({
    onSuccess: () => {
      utils.user.ownInfo.invalidate();
    },
  });

  const notification = useNotifications();

  const { saveImagesToFileSystem } = useSaveImagesToFileSystem();

  const setZoneAssetsToDb = async ({
    zoneId,
    zoneName,
  }: {
    zoneId: string;
    zoneName: string;
  }) => {
    try {
      const data = await utils.user.offlineAssets.fetch({ zoneId });
      await saveAssetsToDb({ zoneId, data, zoneName });
      notification.notify("success", {
        params: {
          title: "Zona descargada con éxito",
          description: `Ahora ${zoneName} está disponible offline`,
          hideCloseButton: true,
        },
      });
    } catch (error) {
      notification.notify("error", {
        params: {
          title: "Error",
          description: `No se ha podido descargar ${zoneName}`,
        },
      });
      throw error;
    }
  };

  const saveAssetsToDb = async ({
    zoneId,
    zoneName,
    data,
  }: {
    zoneId: string;
    zoneName: string;
    data: Data;
  }) => {
    setIsDownloadedZones((old) => ({
      ...old,
      [zoneId]: { device: deviceName, downloadedAt: new Date(), zoneName },
    }));
    setIsLoading(true);
    try {
      const db = offlineDb.open();

      await offlineDb.createZoneTable(db, zoneId);

      for (const asset of data.assets) {
        const { version, zoneId, assetId } = asset;

        const downloadedAsset = data.assets.find((a) => a.assetId === assetId);

        if (!downloadedAsset) return Promise.resolve(undefined);

        await offlineDb.setAsync(
          db,
          assetId,
          zoneId,
          downloadedAsset.data,
          version,
        );
      }

      setDownloadedAssetsList((prev) => ({
        ...prev,
        [zoneId]: { assets: data.assetList },
      }));

      db.close();

      await saveImagesToFileSystem({
        imagesToDownload: data.imagesToDownload,
        zoneId,
      });

      if (data.location) {
        await downloadMapboxOffline({
          packName: zoneId,
          location: data.location,
          notification,
        });
      }

      addToDownloadedList.mutate({ zoneId });
    } catch (error) {
      setIsDownloadedZones((old) => {
        delete old[zoneId];
        return { ...old };
      });
    }
    setIsLoading(false);
  };

  return { setZoneAssetsToDb, saveAssetsToDb, isLoading };
};

export default useSetAssetsToDb;
