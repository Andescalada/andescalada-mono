import { RouterOutputs } from "@andescalada/utils/trpc";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";

export type DownloadedAssetsList = {
  [zoneId: string]: {
    assets: RouterOutputs["user"]["offlineAssets"]["assetList"];
  };
};

export type ImagesToDownload =
  RouterOutputs["user"]["offlineAssets"]["imagesToDownload"];

export type DownloadedZones = {
  [zoneId: string]: {
    downloadedAt: Date;
    device: string | null;
    zoneName: string;
  };
};

export const isOfflineModeAtom = atomWithMMKV(Storage.IS_OFFLINE_MODE, false);

export const downloadedAssetsListAtom = atomWithMMKV<DownloadedAssetsList>(
  Storage.DOWNLOADED_ASSETS,
  {},
);

export const downloadedZonesAtom = atomWithMMKV<DownloadedZones>(
  Storage.DOWNLOADED_ZONES,
  {},
);

export const downloadedImagesAtom = atomWithMMKV<{
  [zoneId: string]: ImagesToDownload;
}>(Storage.DOWNLOADED_IMAGES, {});
