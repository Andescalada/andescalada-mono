import { Box, Colors, Icon, Pressable, Screen, Text } from "@andescalada/ui";
import { Ionicons } from "@expo/vector-icons";
import NextButton from "@features/zoneManager/components/NextButton";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import StepRoles from "@features/zoneManager/ZoneOnboardingScreen/StepRoles";
import StepSuccess from "@features/zoneManager/ZoneOnboardingScreen/StepSuccess";
import { useAppTheme } from "@hooks/useAppTheme";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import { FC, useRef } from "react";
import { FlatList } from "react-native";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.ZoneOnboarding>;

const BUTTON_SIZE = 50;

const data = [
  {
    id: "1",
    screen: (onPress: () => void) => <StepSuccess onNext={onPress} />,
  },
  {
    id: "2",
    screen: (onPress: () => void) => <StepRoles onNext={onPress} />,
  },
];

const ZoneOnboardingScreen: FC<Props> = (props) => {
  const ref = useRef<FlatList>(null);
  const theme = useAppTheme();
  return (
    <Screen safeAreaDisabled>
      <FlatList
        ref={ref}
        data={data}
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
