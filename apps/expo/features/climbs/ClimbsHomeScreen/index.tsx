import OfflineZonesScreen from "@features/climbs/OfflineZonesScreen";
import UserZonesScreen from "@features/climbs/UserZonesScreen";
import useIsConnected from "@hooks/useIsConnected";
import useOfflineMode from "@hooks/useOfflineMode";
import useSyncDownloadedZones from "@hooks/useSyncDownloadedZones";
import sync from "@local-database/sync";
import { useEffect } from "react";

const ClimbsHomeScreen = () => {
  const { isOfflineMode } = useOfflineMode();
  const isConnected = useIsConnected();
  useEffect(() => {
    if (isConnected) sync();
  }, [isConnected]);

  useSyncDownloadedZones();

  if (isOfflineMode) return <OfflineZonesScreen />;
  return <UserZonesScreen />;
};

export default ClimbsHomeScreen;
