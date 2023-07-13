import { Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import StepWelcome from "@features/photoContest/OnboardingScreen/StepWelcome";
import { FC, useRef } from "react";
import { FlatList, useWindowDimensions } from "react-native";

const data = [
  {
    id: "welcome",
    screen: (onPress: () => void) => <StepWelcome onNext={onPress} />,
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
        scrollEnabled={false}
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
          )
        }
      />
    </Screen>
  );
};

export default OnboardingScreen;
