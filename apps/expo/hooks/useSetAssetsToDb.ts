import { trpc } from "@andescalada/utils/trpc";
import { downloadedAssetsListAtom, downloadedZonesAtom } from "@atoms/index";
import { useSaveImagesToFileSystem } from "@hooks/useSaveImagesToFileSystem";
import { useNotifications } from "@utils/notificated";
import offlineDb from "@utils/quick-sqlite";
import { deviceName } from "expo-device";
import { atom, useAtom } from "jotai";
import { useState } from "react";
import { stringify } from "superjson";

export const progressAtom = atom(0);

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

  const setAssetsToDb = async ({
    zoneId,
    zoneName,
  }: {
    zoneId: string;
    zoneName: string;
  }) => {
    const fetchAssets = utils.user.offlineAssets.fetch;
    setIsDownloadedZones((old) => ({
      ...old,
      [zoneId]: { device: deviceName, downloadedAt: new Date(), zoneName },
    }));
    setIsLoading(true);
    try {
      const data = await fetchAssets({ zoneId });
      if (!data) return;

      const db = offlineDb.open();

      const setToDB = data.assets.map((asset) => {
        const { params, router, procedure, version, zoneId } = asset;
        const queryKey = stringify({ router, procedure, params });

        const downloadedAsset = data.assets.find(
          (a) =>
            a.procedure === procedure &&
            a.router === router &&
            a.params === params,
        );

        if (!downloadedAsset) return;

        return offlineDb.setOrCreate(
          db,
          queryKey,
          zoneId,
          downloadedAsset.data,
          version,
        );
      });
      await Promise.allSettled(setToDB);
      setDownloadedAssetsList((prev) => [...prev, ...data.assetList]);
      db.close();
      await saveImagesToFileSystem({
        imagesToDownload: data.imagesToDownload,
        zoneId,
      });
      notification.notify("success", {
        params: {
          title: "Zona descargada con éxito",
          description: `Ahora ${zoneName} está disponible offline`,
          hideCloseButton: true,
        },
      });
      addToDownloadedList.mutate({ zoneId });
    } catch (error) {
      setIsDownloadedZones((old) => {
        delete old[zoneId];
        return old;
      });
      notification.notify("error", {
        params: {
          title: "Error",
          description: "No se pudo descargar los datos",
        },
      });
    }
    setIsLoading(false);
  };
  return { setAssetsToDb, isLoading };
};

export default useSetAssetsToDb;
