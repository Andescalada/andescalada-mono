import { Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { FC } from "react";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.VerifyInformation>;

const VerifyInformationScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Verify</Text>
    </Screen>
  );
};

export default VerifyInformationScreen;
