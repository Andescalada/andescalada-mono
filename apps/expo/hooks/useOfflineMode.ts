import { trpc } from "@andescalada/utils/trpc";
import { useHydrateOfflineAssets } from "@hooks/useHydrateOfflineAssets";
import { onlineManager } from "@tanstack/react-query";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";
import { useAtom } from "jotai";

const isOfflineModeAtom = atomWithMMKV(Storage.IS_OFFLINE_MODE, false);

const useOfflineMode = () => {
  const [isOfflineMode, setIsOfflineModeAtom] = useAtom(isOfflineModeAtom);
  const utils = trpc.useContext();

  const { hydrate } = useHydrateOfflineAssets();

  const setIsOfflineMode = () => {
    utils.invalidate();
    setIsOfflineModeAtom((isCurrentlyOfflineModeStatus) => {
      if (isCurrentlyOfflineModeStatus) {
        onlineManager.setOnline(undefined);
        hydrate();
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
    hydrate();
  };

  return { isOfflineMode, setIsOfflineMode, activateOfflineMode };
};

export default useOfflineMode;
