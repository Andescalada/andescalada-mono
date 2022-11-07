import OfflineZonesScreen from "@features/climbs/OfflineZonesScreen";
import UserZonesScreen from "@features/climbs/UserZonesScreen";
import useOfflineMode from "@hooks/useOfflineMode";

const ClimbsHomeScreen = () => {
  const { isOfflineMode } = useOfflineMode();
  if (isOfflineMode) return <OfflineZonesScreen />;
  return <UserZonesScreen />;
};

export default ClimbsHomeScreen;
