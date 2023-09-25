import OfflineZonesScreen from "@features/climbs/OfflineZonesScreen";
import UserZonesScreen from "@features/climbs/UserZonesScreen";
import useOfflineMode from "@hooks/useOfflineMode";
import useSyncDownloadedZones from "@hooks/useSyncDownloadedZones";
import { useWatermelon } from "@local-database/sync";

const ClimbsHomeScreen = () => {
  const { isOfflineMode } = useOfflineMode();

  useWatermelon();

  useSyncDownloadedZones();

  if (isOfflineMode) return <OfflineZonesScreen />;
  return <UserZonesScreen />;
};

export default ClimbsHomeScreen;
