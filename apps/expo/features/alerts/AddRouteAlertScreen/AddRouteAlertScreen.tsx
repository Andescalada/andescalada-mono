import { Screen, Text } from "@andescalada/ui";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import { FC } from "react";

type Props = AlertsScreenProps<AlertsRoutes.AddRouteAlert>;

const AddRouteAlertScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Route Alert</Text>
    </Screen>
  );
};

export default AddRouteAlertScreen;
