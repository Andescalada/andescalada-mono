import OfflineZonesScreen from "@features/climbs/OfflineZonesScreen";
import UserZonesScreen from "@features/climbs/UserZonesScreen";
import useOfflineMode from "@hooks/useOfflineMode";
import useGetOwnUserQuery from "@local-database/hooks/useGetOwnUserQuery";

const ClimbsHomeScreen = () => {
  const { isOfflineMode } = useOfflineMode();

  const q = useGetOwnUserQuery();
  console.log(q?.data?.preferredBoulderGrade);

  if (isOfflineMode) return <OfflineZonesScreen />;
  return <UserZonesScreen />;
};

export default ClimbsHomeScreen;
