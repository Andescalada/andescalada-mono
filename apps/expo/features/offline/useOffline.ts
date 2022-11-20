import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import setAssetsToDb from "@features/offline/utils/setAssetsToDb";
import setImagesToFileSystem from "@features/offline/utils/setImagesToFileSystem";
import { useAppSelector } from "@hooks/redux";
import useOfflineMode from "@hooks/useOfflineMode";
import { onlineManager } from "@tanstack/react-query";
import { inferProcedureOutput } from "@trpc/server";
import allSettled from "@utils/allSetled";
import storage, { Storage } from "@utils/mmkv/storage";
import offlineDb from "@utils/quick-sqlite";
import { useCallback, useEffect } from "react";
import { useIsConnected } from "react-native-offline";
import { parse, stringify } from "superjson";

type ListToDownload = inferProcedureOutput<
  AppRouter["user"]["getDownloadedAssets"]
>;

interface Args {
  fetchAssets?: boolean;
}

const useOffline = ({ fetchAssets = false }: Args = {}) => {
  const { isOfflineMode } = useOfflineMode();
  const isConnected = useIsConnected();

  const utils = trpc.useContext();
  const { isDownloading, progress, errors } = useAppSelector(
    (state) => state.offline,
  );

  trpc.user.getDownloadedAssets.useQuery(undefined, {
    enabled: fetchAssets,
    onSuccess: async (data) => {
      if (!fetchAssets) return;

      const { assetsToDownload, imagesToDownload } = data;

      await allSettled([
        setAssetsToDb(assetsToDownload, { forceUpdate: true }),
        setImagesToFileSystem(imagesToDownload),
      ]);
    },
  });

  const hydrate = useCallback(() => {
    const res = storage.getString(Storage.DOWNLOADED_ASSETS);
    if (!res) return;
    const downloadedList = parse<ListToDownload["assetsToDownload"]>(res);
    downloadedList.forEach((asset) => {
      const { params, router, procedure, zoneId } = asset;

      // @ts-ignore
      const selectedUtil = utils[router][procedure];

      const db = offlineDb.open();
      const savedData = offlineDb.get(
        db,
        stringify({ router, procedure, params }),
        zoneId,
      );

      if (!savedData) return;

      selectedUtil.setData(params, savedData.data);
      db.close();
    });
  }, [utils]);

  useEffect(() => {
    if (isOfflineMode) {
      hydrate();
      onlineManager.setOnline(false);
    }
    onlineManager.setOnline(!!isConnected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOfflineMode, hydrate]);

  return {
    isDownloading,
    progress,
    errors,
    setAssetsToDb,
  };
};

export default useOffline;
