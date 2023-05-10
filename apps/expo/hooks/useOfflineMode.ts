import { isOfflineModeAtom } from "@atoms/index";
import { onlineManager, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

const useOfflineMode = () => {
  const [isOfflineMode, setIsOfflineModeAtom] = useAtom(isOfflineModeAtom);

  const queryClient = useQueryClient();

  const setIsOfflineMode = () => {
    setIsOfflineModeAtom((isCurrentlyOfflineModeStatus) => {
      if (isCurrentlyOfflineModeStatus) {
        onlineManager.setOnline(undefined);
        return false;
      } else {
        queryClient.invalidateQueries(["offlineData"], {
          refetchType: "all",
        });
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
