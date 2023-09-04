import { Screen, Text } from "@andescalada/ui";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { FC } from "react";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.ToposByUser>;

const ToposByUserScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>ToposByYser</Text>
    </Screen>
  );
};

export default ToposByUserScreen;
