import { Screen } from "@andescalada/ui";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import StepHowToPublish from "@features/zoneManager/components/StepHowToPublish";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import StepRoles from "@features/zoneManager/ZoneOnboardingScreen/StepRoles";
import StepSuccess from "@features/zoneManager/ZoneOnboardingScreen/StepSuccess";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC, useRef } from "react";
import { FlatList, useWindowDimensions } from "react-native";

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

const ZoneOnboardingScreen: FC<Props> = ({
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const ref = useRef<FlatList>(null);
  const moveToNextStep = (index: number) => {
    ref.current?.scrollToIndex({ index: index + 1 });
  };

  const rootNavigation = useRootNavigation();

  const navigateToZone = () => {
    rootNavigation.navigate(RootNavigationRoutes.Climbs, {
      screen: ClimbsNavigationRoutes.Zone,
      params: {
        zoneId,
        zoneName,
      },
    });
  };

  const { width: screenWidth } = useWindowDimensions();

  return (
    <Screen safeAreaDisabled>
      <FlatList
        ref={ref}
        data={data}
        initialNumToRender={1}
        horizontal
        initialScrollIndex={0}
        snapToInterval={screenWidth}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>
          item.screen(
            item.id === "3" ? navigateToZone : () => moveToNextStep(index),
          )
        }
      />
    </Screen>
  );
};

export default ZoneOnboardingScreen;
