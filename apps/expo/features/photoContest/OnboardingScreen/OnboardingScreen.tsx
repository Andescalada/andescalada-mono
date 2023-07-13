import { Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import StepGeneralDetails from "@features/photoContest/OnboardingScreen/StepGeneralDetails";
import StepSelectWall from "@features/photoContest/OnboardingScreen/StepSelectWall";
import StepSharePhoto from "@features/photoContest/OnboardingScreen/StepSharePhoto";
import StepUploadWall from "@features/photoContest/OnboardingScreen/StepUploadWall";
import StepWelcome from "@features/photoContest/OnboardingScreen/StepWelcome";
import StepWhoWins from "@features/photoContest/OnboardingScreen/StepWhoWins";
import { FC, useRef } from "react";
import { FlatList, useWindowDimensions } from "react-native";

const data = [
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

type Props = PhotoContestScreenProps<PhotoContestRoutes.Onboarding>;

const OnboardingScreen: FC<Props> = (props) => {
  const ref = useRef<FlatList>(null);
  const moveToNextStep = (index: number) => {
    ref.current?.scrollToIndex({ index: index + 1 });
  };
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen safeAreaDisabled>
      <FlatList
        ref={ref}
        data={data}
        initialNumToRender={1}
        scrollEnabled={true}
        horizontal
        snapToInterval={screenWidth}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>
          item.screen(
            data.length === index + 1
              ? () => {
                  return;
                }
              : () => moveToNextStep(index),
            index,
          )
        }
      />
    </Screen>
  );
};

export default OnboardingScreen;
