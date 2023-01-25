import FirstTimeGradingSystemScreen from "@features/onboarding/FirstTimeGradingSystemScreen";
import UsernameAndImage from "@features/onboarding/UsernameAndImageScreen";
import { createStackNavigator } from "@react-navigation/stack";

import { OnboardingNavigationParamList, OnboardingRoutes } from "./types";

const Stack = createStackNavigator<OnboardingNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={OnboardingRoutes.UsernameAndImage}
        component={UsernameAndImage}
      />
      <Stack.Screen
        name={OnboardingRoutes.FirstTimeGradingSystem}
        component={FirstTimeGradingSystemScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
