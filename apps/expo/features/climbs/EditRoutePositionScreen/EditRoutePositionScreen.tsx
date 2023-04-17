import { Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { FC } from "react";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.EditRoutePosition>;

const EditRoutePositionScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Edit position</Text>
    </Screen>
  );
};

export default EditRoutePositionScreen;
