import { AppRouter } from "@andescalada/api/src/routers/_app";
import { blurImage } from "@andescalada/utils/cloudinary";
import { inferProcedureOutput } from "@trpc/server";
import allSettled from "@utils/allSetled";
import { optimizedImage } from "@utils/cloudinary";
import fileSystem from "@utils/FileSystem";
import storage, { Storage } from "@utils/mmkv/storage";
import { parse, stringify } from "superjson";

type ListToDownload = inferProcedureOutput<
  AppRouter["user"]["getDownloadedAssets"]
>;

export const imageVariantsSavedOffline = (publicId: string) => {
  const mainImage = optimizedImage(publicId);
  const thumbnailImage = blurImage(publicId);

  return [thumbnailImage, mainImage];
};

export const saveImagesToFileSystem = async (
  assetsToDownload: ListToDownload["imagesToDownload"],
) => {
  if (!assetsToDownload) return;

  const savedImagesString = storage.getString(Storage.DOWNLOADED_IMAGES);

  const savedImages = savedImagesString
    ? parse<ListToDownload["imagesToDownload"]>(savedImagesString)
    : [];

  const imagesToDelete = savedImages.filter(
    (image) => !assetsToDownload.find((i) => i.id === image.id),
  );

  await imagesToDelete.reduce(async (prevImage, image) => {
    const { publicId } = image;

    if (!publicId) return prevImage;

    const variantsToDelete = imageVariantsSavedOffline(publicId).map(
      (imageObject) => {
        if (!imageObject) throw new Error("Image not found");
        return fileSystem.deleteImage(imageObject.uniqueId);
      },
    );

    await allSettled(variantsToDelete);

    return prevImage;
  }, Promise.resolve());

  await assetsToDownload.reduce(async (prevAsset, asset) => {
    const { publicId } = asset;
    if (!publicId) return (await prevAsset) + 1;

    await deleteSavedImages(publicId);

    return (await prevAsset) + 1;
  }, Promise.resolve(0));

  storage.set(Storage.DOWNLOADED_IMAGES, stringify(assetsToDownload));
};

export const deleteSavedImages = (publicId: string) => {
  const variantsToSave = imageVariantsSavedOffline(publicId).map(
    (imageObject) => {
      if (!imageObject) throw new Error("Image not found");
      return fileSystem.storeImage(
        {
          url: imageObject.url,
          uniqueId: imageObject.uniqueId,
        },
        "permanent",
      );
    },
  );
  return allSettled(variantsToSave);
};
