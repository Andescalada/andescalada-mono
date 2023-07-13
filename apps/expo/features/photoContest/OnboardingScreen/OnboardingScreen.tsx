import { Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { FC } from "react";

type Props = PhotoContestScreenProps<PhotoContestRoutes.Onboarding>;

const OnboardingScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Onboarding</Text>
    </Screen>
  );
};

export default OnboardingScreen;
