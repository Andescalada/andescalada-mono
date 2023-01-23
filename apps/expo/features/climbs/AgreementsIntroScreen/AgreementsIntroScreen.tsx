import { Screen } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import AgreementsIntro from "@templates/AgreementsIntro";
import { FC } from "react";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AgreementsIntro>;

const AgreementsIntroScreen: FC<Props> = ({ navigation }) => {
  return (
    <Screen backgroundColor="brand.primaryA">
      <AgreementsIntro onContinue={navigation.goBack} />
    </Screen>
  );
};

export default AgreementsIntroScreen;
