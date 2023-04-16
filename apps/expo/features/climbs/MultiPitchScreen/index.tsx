import { Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { FC } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.MultiPitch>;

const MultiPitchScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Multi pitch</Text>
    </Screen>
  );
};

export default MultiPitchScreen;
