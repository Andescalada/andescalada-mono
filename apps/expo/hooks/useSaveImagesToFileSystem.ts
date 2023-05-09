import { AppRouter } from "@andescalada/api/src/routers/_app";
import { urlGen } from "@andescalada/utils/cloudinary";
import { downloadedImagesAtom } from "@atoms/index";
import { inferProcedureOutput } from "@trpc/server";
import fileSystem from "@utils/FileSystem";
import { useAtom } from "jotai";
import { useCallback } from "react";

type ListToDownload = inferProcedureOutput<AppRouter["user"]["offlineAssets"]>;

export const imageVariantsSavedOffline = (publicId: string) => {
  const mainImage = urlGen.optimizedImage({ publicId });
  const thumbnailImage = urlGen.blurImage({ publicId });

  return [thumbnailImage, mainImage];
};

export const useSaveImagesToFileSystem = () => {
  const setDownloadedImages = useAtom(downloadedImagesAtom)[1];
  const saveImagesToFileSystem = useCallback(
    async ({
      imagesToDownload,
      zoneId,
    }: {
      imagesToDownload: ListToDownload["imagesToDownload"];
      zoneId: string;
    }) => {
      if (!imagesToDownload) return;

      await imagesToDownload.reduce(async (prevAsset, asset) => {
        const { publicId } = asset;
        if (!publicId) return (await prevAsset) + 1;

        const variantsToDownload = imageVariantsSavedOffline(publicId);

        for (const variant of variantsToDownload) {
          const { uniqueId, url } = variant || {};
          if (!url || !uniqueId) continue;
          await fileSystem.storeImage({ url, uniqueId });
        }

        return (await prevAsset) + 1;
      }, Promise.resolve(0));

      setDownloadedImages((old) => ({
        ...old,
        [zoneId]: imagesToDownload,
      }));
    },
    [setDownloadedImages],
  );

  return { saveImagesToFileSystem };
};
