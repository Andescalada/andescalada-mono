import { AppRouter } from "@andescalada/api/src/routers/_app";
import { Store } from "@store/index";
import { clearErrors, setError } from "@store/offline";
import { inferProcedureOutput } from "@trpc/server";
import storage, { Storage } from "@utils/mmkv/storage";
import offlineDb from "@utils/quick-sqlite";
import client from "@utils/trpc/client";
import { atom, useAtom } from "jotai";
import { stringify } from "superjson";

type ListToDownload = inferProcedureOutput<
  AppRouter["user"]["getDownloadedAssets"]
>;

export const progressAtom = atom(0);
export const isDownloadingAtom = atom(false);

const { dispatch } = Store;
const useSetAssetsToDb = () => {
  const [_, setProgress] = useAtom(progressAtom);
  const [__, setIsDownloading] = useAtom(isDownloadingAtom);
  const setAssetsToDb = async (
    assetsToDownload: ListToDownload["assetsToDownload"],
    {
      checkVersion = true,
      forceUpdate = false,
    }: {
      checkVersion?: boolean;
      forceUpdate?: boolean;
    } = {
      checkVersion: true,
      forceUpdate: false,
    },
  ) => {
    if (!assetsToDownload) return;

    storage.set(Storage.DOWNLOADED_ASSETS, stringify(assetsToDownload));

    setProgress(0);
    dispatch(clearErrors());
    const db = offlineDb.open();

    const filteredAssets = assetsToDownload.filter((asset) => {
      const { params, router, procedure, version, zoneId } = asset;
      const queryKey = stringify({ router, procedure, params });
      const savedData = offlineDb.get(db, queryKey, zoneId);

      return (
        !savedData ||
        (checkVersion && savedData.version < version) ||
        forceUpdate
      );
    });

    if (filteredAssets.length === 0) return;

    const totalAssets = filteredAssets.length;

    setIsDownloading(true);
    await filteredAssets.reduce(async (prevAsset, asset, index) => {
      const { params, router, procedure, version, zoneId } = asset;
      const queryKey = stringify({ router, procedure, params });

      try {
        // @ts-expect-error Unable to type procedure
        const selectedClient = client[router][procedure];

        const data = await selectedClient.query(params);

        await offlineDb.setOrCreate(db, queryKey, zoneId, data, version);
      } catch (error) {
        let message = "Unknown Error";
        if (error instanceof Error) message = error.message;
        dispatch(setError({ [queryKey]: message }));
      }
      const r = (await prevAsset) + 1;
      setProgress((index + 1) / totalAssets);

      return r;
    }, Promise.resolve(0));

    setIsDownloading(false);

    db.close();
  };
  return { setAssetsToDb };
};

export default useSetAssetsToDb;
