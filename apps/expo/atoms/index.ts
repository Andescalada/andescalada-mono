import { RouterOutputs } from "@andescalada/utils/trpc";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";

type ListToDownload = RouterOutputs["user"]["offlineAssets"]["assetList"];

export const isOfflineModeAtom = atomWithMMKV(Storage.IS_OFFLINE_MODE, false);

export const downloadedAssetsListAtom = atomWithMMKV<ListToDownload>(
  Storage.DOWNLOADED_ASSETS,
  [],
);
