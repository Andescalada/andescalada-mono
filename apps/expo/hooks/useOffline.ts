import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import useOfflineMode from "@hooks/useOfflineMode";
import { inferProcedureOutput } from "@trpc/server";
import allSettled from "@utils/allSetled";
import { getThumbnail, optimizedImage } from "@utils/cloudinary";
import fileSystem from "@utils/FileSystem";
import storage, { Storage } from "@utils/mmkv/storage";
import offlineDb from "@utils/quick-sqlite";
import client from "@utils/trpc/client";
import { useCallback, useEffect, useState } from "react";
import { parse, stringify } from "superjson";

type ListToDownload = inferProcedureOutput<
  AppRouter["user"]["getDownloadedAssets"]
>;

interface Args {
  fetchAssets?: boolean;
}

const useOffline = ({ fetchAssets = false }: Args = {}) => {
  const { isOfflineMode } = useOfflineMode();

  trpc.user.getDownloadedAssets.useQuery(undefined, {
    enabled: fetchAssets,
    onSuccess: (data) => {
      const { assetsToDownload, imagesToDownload } = data;
      allSettled([
        setAssetsToDb(assetsToDownload),
        setImagesToFileSystem(imagesToDownload),
      ]);
    },
  });

  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isError, setIsError] = useState<{ [key: string]: string }[]>([]);
  const utils = trpc.useContext();

  const setAssetsToDb = useCallback(
    async (assetsToDownload: ListToDownload["assetsToDownload"]) => {
      if (!assetsToDownload) return;

      storage.set(Storage.DOWNLOADED_ASSETS, stringify(assetsToDownload));

      const totalAssets = assetsToDownload.length;

      setIsDownloading(true);
      setIsError([]);

      assetsToDownload.forEach(async (asset, index) => {
        const { params, router, procedure, version, zoneId } = asset;
        const queryKey = stringify({ router, procedure, params });
        try {
          setProgress((index + 1) / totalAssets);

          //@ts-ignore
          const selectedClient = client[router][procedure];

          const savedData = offlineDb.get(queryKey, zoneId);

          if (!savedData || savedData.version < version) {
            // @ts-ignore
            const data = await selectedClient.query(params);
            await offlineDb.setOrCreate(queryKey, zoneId, data, version);
          }
        } catch (error) {
          let message = "Unknown Error";
          if (error instanceof Error) message = error.message;
          setIsError((prev) => [...prev, { [queryKey]: message }]);
        }
      });
      setIsDownloading(false);
    },
    [],
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

  const hydrate = useCallback(() => {
    const res = storage.getString(Storage.DOWNLOADED_ASSETS);
    if (!res) return;
    const downloadedList = parse<ListToDownload["assetsToDownload"]>(res);
    downloadedList.forEach((asset) => {
      const { params, router, procedure, zoneId } = asset;

      // @ts-ignore
      const selectedUtil = utils[router][procedure];

      const savedData = offlineDb.get(
        stringify({ router, procedure, params }),
        zoneId,
      );

      if (!savedData) return;
      console.log({ router, procedure, params });
      // console.log(savedData.data);

      selectedUtil.setData(params, savedData.data);
    });
  }, [utils]);

  useEffect(() => {
    if (isOfflineMode) {
      console.log("hydrating");
      hydrate();
    }
  }, [isOfflineMode, hydrate]);

  return { isDownloading, progress, isError, setAssetsToDb };
};

export default useOffline;
