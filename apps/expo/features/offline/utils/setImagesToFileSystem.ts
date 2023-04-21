import { AppRouter } from "@andescalada/api/src/routers/_app";
import { inferProcedureOutput } from "@trpc/server";
import allSettled from "@utils/allSetled";
import { optimizedImage } from "@utils/cloudinary";
import fileSystem from "@utils/FileSystem";
import storage, { Storage } from "@utils/mmkv/storage";
import { parse, stringify } from "superjson";

type ListToDownload = inferProcedureOutput<
  AppRouter["user"]["getDownloadedAssets"]
>;

const setImagesToFileSystem = async (
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

    const mainImage = optimizedImage(publicId);
    if (!mainImage) return prevImage;
    await fileSystem.deleteImage(mainImage.uniqueId);
    return prevImage;
  }, Promise.resolve());

  await assetsToDownload.reduce(async (prevAsset, asset) => {
    const { publicId } = asset;
    if (!publicId) return (await prevAsset) + 1;

    const mainImage = optimizedImage(publicId);
    const cachedMainImage = async () =>
      mainImage &&
      (await fileSystem.storeImage(
        {
          url: mainImage.url,
          uniqueId: mainImage.uniqueId,
        },
        "permanent",
      ));

    await allSettled([cachedMainImage()]);

    return (await prevAsset) + 1;
  }, Promise.resolve(0));

  storage.set(Storage.DOWNLOADED_IMAGES, stringify(assetsToDownload));
};

export default setImagesToFileSystem;
