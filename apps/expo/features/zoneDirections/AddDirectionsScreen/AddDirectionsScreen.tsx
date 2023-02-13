import { Screen, Text } from "@andescalada/ui";
import {
  ZoneDirectionsRoutes,
  ZoneDirectionsScreenProps,
} from "@features/zoneDirections/Navigation/types";
import { FC } from "react";

type Props = ZoneDirectionsScreenProps<ZoneDirectionsRoutes.AddDirections>;

const AddDirectionsScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text></Text>
    </Screen>
  );
};

export default AddDirectionsScreen;
