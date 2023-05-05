import { trpc } from "@andescalada/utils/trpc";
import { downloadedAssetsListAtom } from "@features/offline/useOffline";
import { saveImagesToFileSystem } from "@features/offline/utils/offlineImages";
import { useNotifications } from "@utils/notificated";
import offlineDb from "@utils/quick-sqlite";
import { atom, useAtom } from "jotai";
import { stringify } from "superjson";

export const progressAtom = atom(0);
export const isDownloadingAtom = atom(false);

const useSetAssetsToDb = () => {
  const setIsDownloading = useAtom(isDownloadingAtom)[1];
  const setDownloadedAssetsList = useAtom(downloadedAssetsListAtom)[1];

  const notification = useNotifications();

  const utils = trpc.useContext();
  const setAssetsToDb = async ({ zoneId }: { zoneId: string }) => {
    const fetchAssets = utils.user.offlineAssets.fetch;
    try {
      const data = await fetchAssets({ zoneId });
      if (!data) return;

      setIsDownloading(true);

      const db = offlineDb.open();

      const setToDB = data.assets.map((asset) => {
        const { params, router, procedure, version, zoneId } = asset;
        const queryKey = stringify({ router, procedure, params });
        return offlineDb.setOrCreate(db, queryKey, zoneId, data, version);
      });
      await Promise.allSettled(setToDB);
      setDownloadedAssetsList((prev) => [...prev, ...data.assetList]);
      db.close();
      await saveImagesToFileSystem(data.imagesToDownload);
    } catch (error) {
      notification.notify("error", {
        params: {
          title: "Error",
          description: "No se pudo descargar los datos",
        },
      });
    }

    setIsDownloading(false);
  };
  return { setAssetsToDb };
};

export default useSetAssetsToDb;
