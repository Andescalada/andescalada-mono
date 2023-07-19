import { Screen, Text } from "@andescalada/ui";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { FC } from "react";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoManager>;

const TopoManagerScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text></Text>
    </Screen>
  );
};

export default TopoManagerScreen;
