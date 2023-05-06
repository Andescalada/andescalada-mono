import { atomWithMMKV, Storage } from "@utils/mmkv/storage";

export const isOfflineModeAtom = atomWithMMKV(Storage.IS_OFFLINE_MODE, false);
