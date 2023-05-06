import { trpc } from "@andescalada/utils/trpc";
import { isOfflineModeAtom } from "@atoms/index";
import { useHydrateOfflineAssets } from "@hooks/useHydrateOfflineAssets";
import { onlineManager } from "@tanstack/react-query";
import { useAtom } from "jotai";
import * as Sentry from "sentry-expo";

const useOfflineMode = () => {
  const [isOfflineMode, setIsOfflineModeAtom] = useAtom(isOfflineModeAtom);
  const utils = trpc.useContext();

  const { hydrate } = useHydrateOfflineAssets();

  Sentry.Native.captureMessage(
    `isOfflineMode: ${isOfflineMode}, isOnline ${onlineManager.isOnline()}`,
  );

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
