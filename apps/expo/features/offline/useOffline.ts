import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import useOfflineMode from "@hooks/useOfflineMode";
import {
  clearErrors,
  setError,
  setIsDownloading,
  setProgress,
} from "@store/offline";
import { onlineManager } from "@tanstack/react-query";
import { inferProcedureOutput } from "@trpc/server";
import allSettled from "@utils/allSetled";
import { getThumbnail, optimizedImage } from "@utils/cloudinary";
import fileSystem from "@utils/FileSystem";
import storage, { Storage } from "@utils/mmkv/storage";
import offlineDb from "@utils/quick-sqlite";
import client from "@utils/trpc/client";
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
  const dispatch = useAppDispatch();

  const setAssetsToDb = useCallback(
    async (
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

      dispatch(setProgress(0));
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

      dispatch(setIsDownloading(true));
      await filteredAssets.reduce(async (prevAsset, asset, index) => {
        const { params, router, procedure, version, zoneId } = asset;
        const queryKey = stringify({ router, procedure, params });

        try {
          //@ts-ignore
          const selectedClient = client[router][procedure];
          const savedData = offlineDb.get(db, queryKey, zoneId);

          //@ts-ignore
          const data = await selectedClient.query(params);

          await offlineDb.setOrCreate(db, queryKey, zoneId, data, version);
        } catch (error) {
          let message = "Unknown Error";
          if (error instanceof Error) message = error.message;
          dispatch(setError({ [queryKey]: message }));
        }
        const r = (await prevAsset) + 1;
        dispatch(setProgress((index + 1) / totalAssets));

        return r;
      }, Promise.resolve(0));

      dispatch(setIsDownloading(false));

      db.close();
    },
    [dispatch],
  );

  const setImagesToFileSystem = useCallback(
    async (assetsToDownload: ListToDownload["imagesToDownload"]) => {
      if (!assetsToDownload) return;

      storage.set(Storage.DOWNLOADED_IMAGES, stringify(assetsToDownload));
      assetsToDownload.forEach(async (asset) => {
        const { publicId } = asset;
        if (!publicId) return;
        const thumbnail = getThumbnail(publicId);

        const cachedThumbnail = async () =>
          thumbnail &&
          fileSystem.storeImage(
            {
              url: thumbnail.url,
              uniqueId: thumbnail.uniqueId,
            },
            "permanent",
          );

        const mainImage = optimizedImage(publicId);
        const cachedMainImage = async () =>
          mainImage &&
          fileSystem.storeImage(
            {
              url: mainImage.url,
              uniqueId: mainImage.uniqueId,
            },
            "permanent",
          );
        allSettled([cachedThumbnail(), cachedMainImage()]);
      });
    },
    [],
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
    setImagesToFileSystem,
  };
};

export default useOffline;
