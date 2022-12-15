import { Screen, Text } from "@andescalada/ui";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import { FC } from "react";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.AddNewZoneScreen>;

const AddNewZoneScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text></Text>
    </Screen>
  );
};

export default AddNewZoneScreen;
