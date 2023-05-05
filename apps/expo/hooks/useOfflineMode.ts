import { onlineManager } from "@tanstack/react-query";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";
import { useAtom } from "jotai";

const isOfflineModeAtom = atomWithMMKV(Storage.IS_OFFLINE_MODE, false);

const useOfflineMode = () => {
  const [isOfflineMode, setIsOfflineModeAtom] = useAtom(isOfflineModeAtom);

  const setIsOfflineMode = () => {
    setIsOfflineModeAtom((isCurrentlyOfflineModeStatus) => {
      if (isCurrentlyOfflineModeStatus) {
        onlineManager.setOnline(undefined);
        return false;
      } else {
        onlineManager.setOnline(false);
        return true;
      }
    });
  };

  const activateOfflineMode = () => {
    setIsOfflineModeAtom(true);
    onlineManager.setOnline(false);
  };

  return { isOfflineMode, setIsOfflineMode, activateOfflineMode };
};

export default useOfflineMode;
