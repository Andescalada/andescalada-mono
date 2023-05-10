import { RouterOutputs } from "@andescalada/utils/trpc";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";

type ListToDownload = RouterOutputs["user"]["offlineAssets"]["assetList"];
type ImagesToDownload =
  RouterOutputs["user"]["offlineAssets"]["imagesToDownload"];

export const isOfflineModeAtom = atomWithMMKV(Storage.IS_OFFLINE_MODE, false);

export const downloadedAssetsListAtom = atomWithMMKV<ListToDownload>(
  Storage.DOWNLOADED_ASSETS,
  [],
);

export const downloadedZonesAtom = atomWithMMKV<{
  [zoneId: string]: {
    downloadedAt: Date;
    device: string | null;
    zoneName: string;
  };
}>(Storage.DOWNLOADED_ZONES, {});

export const downloadedImagesAtom = atomWithMMKV<{
  [zoneId: string]: ImagesToDownload;
}>(Storage.DOWNLOADED_IMAGES, {});
