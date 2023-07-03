import { Icon, Screen, Text } from "@andescalada/ui";
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
      <Icon name="danger-color" size={100} />
    </Screen>
  );
};

export default TermsAndConditionsScreen;
