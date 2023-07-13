import { Screen } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import PageIndicator from "@features/photoContest/OnboardingScreen/PageIndicator";
import {
  Steps,
  stepsCount,
} from "@features/photoContest/OnboardingScreen/Steps";
import { set } from "immer/dist/internal";
import { FC, useRef, useState } from "react";
import { FlatList, useWindowDimensions } from "react-native";

type Props = PhotoContestScreenProps<PhotoContestRoutes.Onboarding>;

const OnboardingScreen: FC<Props> = (props) => {
  const ref = useRef<FlatList>(null);
  const moveToNextStep = (index: number) => {
    ref.current?.scrollToIndex({ index: index + 1 });
  };
  const { width: screenWidth } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Screen safeAreaDisabled>
      <FlatList
        ref={ref}
        data={Steps}
        initialNumToRender={1}
        scrollEnabled={true}
        horizontal
        snapToInterval={screenWidth}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
              Math.floor(event.nativeEvent.layoutMeasurement.width),
          );
          setCurrentIndex(index);
        }}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        renderItem={({ item, index }) => {
          return item.screen(
            stepsCount === index + 1
              ? () => {
                  return;
                }
              : () => moveToNextStep(index),
            index,
          );
        }}
      />
      <PageIndicator currentIndex={currentIndex} />
    </Screen>
  );
};

export default OnboardingScreen;
