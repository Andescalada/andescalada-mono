import { Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { FC } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Route>;

const RouteScreen: FC<Props> = ({
  route: {
    params: { routeName },
  },
}) => {
  return (
    <Screen>
      <Text>{routeName}</Text>
    </Screen>
  );
};

export default RouteScreen;
