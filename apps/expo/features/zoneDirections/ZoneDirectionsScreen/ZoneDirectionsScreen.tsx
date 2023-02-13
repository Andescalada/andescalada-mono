import { Screen, Text } from "@andescalada/ui";
import {
  ZoneDirectionsRoutes,
  ZoneDirectionsScreenProps,
} from "@features/zoneDirections/Navigation/types";
import { FC } from "react";

type Props = ZoneDirectionsScreenProps<ZoneDirectionsRoutes.ZoneDirections>;

const ZoneDirectionsScreen: FC<Props> = () => {
  return (
    <Screen>
      <Text>Zone directions</Text>
    </Screen>
  );
};

export default ZoneDirectionsScreen;
