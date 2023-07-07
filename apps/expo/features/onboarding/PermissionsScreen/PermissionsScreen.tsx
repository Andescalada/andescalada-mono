import { Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  OnboardingRoutes,
  OnboardingScreenProps,
} from "@features/onboarding/Navigation/types";
import StepLocation from "@features/onboarding/PermissionsScreen/StepLocation";
import StepNotifications from "@features/onboarding/PermissionsScreen/StepNotifications";
import StepShareErrors from "@features/onboarding/PermissionsScreen/StepShareErrors";
import StepSuccess from "@features/onboarding/PermissionsScreen/StepSuccess";
import { isIOS } from "@utils/platform";
import { FC, useRef } from "react";
import { FlatList, useWindowDimensions } from "react-native";

type Props = OnboardingScreenProps<OnboardingRoutes.Permissions>;

const data = [
  {
    id: "location",
    showOnIOS: true,
    showOnAndroid: true,
    screen: (onPress: () => void) => <StepLocation onNext={onPress} />,
  },
  {
    id: "shareErrors",
    showOnIOS: true,
    showOnAndroid: false,
    screen: (onPress: () => void) => <StepShareErrors onNext={onPress} />,
  },
  {
    id: "notifications",
    showOnIOS: true,
    showOnAndroid: true,
    screen: (onPress: () => void) => <StepNotifications onNext={onPress} />,
  },
  {
    id: "success",
    showOnIOS: true,
    showOnAndroid: true,
    screen: (onPress: () => void) => <StepSuccess onNext={onPress} />,
  },
];

const PermissionsScreen: FC<Props> = ({}) => {
  const ref = useRef<FlatList>(null);
  const moveToNextStep = (index: number) => {
    ref.current?.scrollToIndex({ index: index + 1 });
  };

  const { width: screenWidth } = useWindowDimensions();

  const filteredDataByOS = data.filter((item) =>
    isIOS ? item.showOnIOS : item.showOnAndroid,
  );

  const firstTimeLogin = trpc.user.firstTimeLogin.useMutation();

  const utils = trpc.useContext();

  return (
    <Screen safeAreaDisabled>
      <FlatList
        ref={ref}
        data={filteredDataByOS}
        initialNumToRender={1}
        scrollEnabled={false}
        horizontal
        snapToInterval={screenWidth}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>
          item.screen(
            filteredDataByOS.length === index + 1
              ? async () => {
                  await firstTimeLogin.mutateAsync(false);
                  utils.user.ownInfo.invalidate();
                }
              : () => moveToNextStep(index),
          )
        }
      />
    </Screen>
  );
};

export default PermissionsScreen;
