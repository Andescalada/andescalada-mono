import { Screen, Text } from "@andescalada/ui";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import { FC } from "react";

type Props = AlertsScreenProps<AlertsRoutes.RouteAlert>;

const RouteAlertScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text></Text>
    </Screen>
  );
};

export default RouteAlertScreen;
