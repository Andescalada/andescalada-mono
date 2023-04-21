import { AppRouter } from "@andescalada/api/src/routers/_app";
import { inferProcedureOutput } from "@trpc/server";
import { optimizedImage } from "@utils/cloudinary";
import fileSystem from "@utils/FileSystem";
import storage, { Storage } from "@utils/mmkv/storage";
import { parse } from "superjson";

type ListToDownload = inferProcedureOutput<
  AppRouter["user"]["getDownloadedAssets"]
>;

const deleteSavedImages = async (zoneId: string) => {
  const res = storage.getString(Storage.DOWNLOADED_IMAGES);
  if (!res) return;
  const downloadedList = parse<ListToDownload["imagesToDownload"]>(res);
  downloadedList
    .filter((asset) => asset.zoneId === zoneId)
    .forEach(async (asset) => {
      const { publicId } = asset;
      if (!publicId) return;
      const mainImage = optimizedImage(publicId);
      if (!mainImage) return;
      await fileSystem.deleteImage(mainImage.uniqueId);
    });
};

export default deleteSavedImages;
