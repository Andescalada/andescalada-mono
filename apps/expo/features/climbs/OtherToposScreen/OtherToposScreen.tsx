import { Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { FC } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.OtherTopos>;

const OtherToposScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Hola</Text>
    </Screen>
  );
};

export default OtherToposScreen;
