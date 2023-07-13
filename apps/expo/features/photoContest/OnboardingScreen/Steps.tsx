import StepGeneralDetails from "@features/photoContest/OnboardingScreen/StepGeneralDetails";
import StepSelectWall from "@features/photoContest/OnboardingScreen/StepSelectWall";
import StepSharePhoto from "@features/photoContest/OnboardingScreen/StepSharePhoto";
import StepUploadWall from "@features/photoContest/OnboardingScreen/StepUploadWall";
import StepWelcome from "@features/photoContest/OnboardingScreen/StepWelcome";
import StepWhoWins from "@features/photoContest/OnboardingScreen/StepWhoWins";

export const Steps = [
  {
    id: "welcome",
    screen: (onPress: () => void, index: number) => (
      <StepWelcome onNext={onPress} index={index} />
    ),
  },
  {
    id: "general-details",
    screen: (onPress: () => void, index: number) => (
      <StepGeneralDetails onNext={onPress} index={index} />
    ),
  },
  {
    id: "select-wall",
    screen: (onPress: () => void, index: number) => (
      <StepSelectWall onNext={onPress} index={index} />
    ),
  },
  {
    id: "upload-wall",
    screen: (onPress: () => void, index: number) => (
      <StepUploadWall onNext={onPress} index={index} />
    ),
  },
  {
    id: "share-wall",
    screen: (onPress: () => void, index: number) => (
      <StepSharePhoto onNext={onPress} index={index} />
    ),
  },
  {
    id: "who-wins",
    screen: (onPress: () => void, index: number) => (
      <StepWhoWins onNext={onPress} index={index} />
    ),
  },
];

export const stepsCount = Steps.length;
