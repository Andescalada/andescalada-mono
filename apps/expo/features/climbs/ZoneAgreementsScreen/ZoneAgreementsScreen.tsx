import { Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { FC } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZoneAgreements>;

const ZoneAgreementsScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Zone agreements</Text>
    </Screen>
  );
};

export default ZoneAgreementsScreen;
