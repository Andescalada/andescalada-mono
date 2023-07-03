import { Screen, Text } from "@andescalada/ui";
import {
  OnboardingRoutes,
  OnboardingScreenProps,
} from "@features/onboarding/Navigation/types";
import { FC } from "react";

type Props = OnboardingScreenProps<OnboardingRoutes.TermsAndConditions>;

const TermsAndConditionsScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Terminos y condiciones</Text>
    </Screen>
  );
};

export default TermsAndConditionsScreen;
