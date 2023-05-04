import { trpc } from "@andescalada/utils/trpc";
import { saveImagesToFileSystem } from "@features/offline/utils/offlineImages";
import offlineDb from "@utils/quick-sqlite";
import { atom, useAtom } from "jotai";
import { stringify } from "superjson";

export const progressAtom = atom(0);
export const isDownloadingAtom = atom(false);

const useSetAssetsToDb = () => {
  const [_, setProgress] = useAtom(progressAtom);
  const [__, setIsDownloading] = useAtom(isDownloadingAtom);

  const utils = trpc.useContext();
  const setAssetsToDb = async ({ zoneId }: { zoneId: string }) => {
    setProgress(0);
    const fetchAssets = utils.user.offlineAssets.fetch;
    const data = await fetchAssets({ zoneId });
    if (!data) return;

    setIsDownloading(true);

    const db = offlineDb.open();

    for (const asset of data.assets) {
      const { params, router, procedure, version, zoneId } = asset;
      const queryKey = stringify({ router, procedure, params });
      await offlineDb.setOrCreate(db, queryKey, zoneId, data, version);
    }
    db.close();

    await saveImagesToFileSystem(data.imagesToDownload);

    setIsDownloading(false);
  };
  return { setAssetsToDb };
};

export default useSetAssetsToDb;
