import { ActivityIndicator, Screen } from "@andescalada/ui";
import EditRoutePositionList from "@features/climbs/EditRoutePositionScreen/EditRoutePositionList";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import useRouteList from "@hooks/useRouteList";
import { FC } from "react";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.EditRoutePosition>;

const EditRoutePositionScreen: FC<Props> = ({
  route: {
    params: { wallId, zoneId, wallName },
  },
}) => {
  const { data, isLoading } = useRouteList({ wallId, zoneId });

  if (isLoading) {
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Screen>
    );
  }

  return <EditRoutePositionList data={data} wallName={wallName} />;
};

export default EditRoutePositionScreen;
