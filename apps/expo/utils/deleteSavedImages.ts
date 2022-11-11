import { AppRouter } from "@andescalada/api/src/routers/_app";
import { inferProcedureOutput } from "@trpc/server";
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
      await fileSystem.deleteImage(publicId);
    });
};

export default deleteSavedImages;
