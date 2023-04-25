import { AppRouter } from "@andescalada/api/src/routers/_app";
import { deleteSavedImages } from "@features/offline/utils/offlineImages";
import { inferProcedureOutput } from "@trpc/server";
import storage, { Storage } from "@utils/mmkv/storage";
import { parse } from "superjson";

type ListToDownload = inferProcedureOutput<
  AppRouter["user"]["getDownloadedAssets"]
>;

const deleteZoneSavedImages = async (zoneId: string) => {
  const res = storage.getString(Storage.DOWNLOADED_IMAGES);
  if (!res) return;
  const downloadedList = parse<ListToDownload["imagesToDownload"]>(res);
  downloadedList
    .filter((asset) => asset.zoneId === zoneId)
    .forEach(async (asset) => {
      const { publicId } = asset;
      if (!publicId) return;
      await deleteSavedImages(publicId);
    });
};

export default deleteZoneSavedImages;
