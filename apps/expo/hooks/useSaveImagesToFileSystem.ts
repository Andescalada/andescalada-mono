import { AppRouter } from "@andescalada/api/src/routers/_app";
import { urlGen } from "@andescalada/utils/cloudinary";
import { downloadedImagesAtom } from "@atoms/index";
import { inferProcedureOutput } from "@trpc/server";
import fileSystem from "@utils/FileSystem";
import { useAtom } from "jotai";
import { useCallback } from "react";
import * as Sentry from "sentry-expo";

type ListToDownload = inferProcedureOutput<AppRouter["user"]["offlineAssets"]>;

export const imageVariantsSavedOffline = (publicId: string) => {
  const mainImage = urlGen.optimizedImage({ publicId });
  const thumbnailImage = urlGen.blurImage({ publicId });

  return [thumbnailImage, mainImage];
};

const downloadImage = async (publicId: string | null) => {
  if (!publicId) return;
  const variantsToDownload = imageVariantsSavedOffline(publicId);
  for (const variant of variantsToDownload) {
    const { uniqueId, url } = variant || {};
    if (!url || !uniqueId) {
      Sentry.Native.captureMessage(
        `Image couldn't be downloaded url:${url} uniqueId:${uniqueId} por publicId:${publicId}`,
        "error",
      );
      continue;
    }
    await fileSystem.storeImage({ url, uniqueId }, "permanent");
  }
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

      const storeImages = imagesToDownload.map((asset) =>
        downloadImage(asset.publicId),
      );

      await Promise.allSettled(storeImages);

      setDownloadedImages((old) => ({
        ...old,
        [zoneId]: imagesToDownload,
      }));
    },
    [setDownloadedImages],
  );

  return { saveImagesToFileSystem };
};
