import { Screen } from "@andescalada/ui";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import StepHowToPublish from "@features/zoneManager/ZoneOnboardingScreen/StepHowToPublish";
import StepRoles from "@features/zoneManager/ZoneOnboardingScreen/StepRoles";
import StepSuccess from "@features/zoneManager/ZoneOnboardingScreen/StepSuccess";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import { FC, useRef } from "react";
import { FlatList } from "react-native";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.ZoneOnboarding>;

const data = [
  {
    id: "1",
    screen: (onPress: () => void) => <StepSuccess onNext={onPress} />,
  },
  {
    id: "2",
    screen: (onPress: () => void) => <StepRoles onNext={onPress} />,
  },
  {
    id: "3",
    screen: (onPress: () => void) => <StepHowToPublish onNext={onPress} />,
  },
];

const ZoneOnboardingScreen: FC<Props> = () => {
  const ref = useRef<FlatList>(null);

  return (
    <Screen safeAreaDisabled>
      <FlatList
        ref={ref}
        data={data}
        initialNumToRender={1}
        horizontal
        snapToInterval={SCREEN_WIDTH}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>
          item.screen(() => ref.current?.scrollToIndex({ index: index + 1 }))
        }
      />
    </Screen>
  );
};

export default ZoneOnboardingScreen;
