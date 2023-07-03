import FirstTimeGradingSystemScreen from "@features/onboarding/FirstTimeGradingSystemScreen";
import PermissionsScreen from "@features/onboarding/PermissionsScreen/PermissionsScreen";
import TermsAndConditionsScreen from "@features/onboarding/TermsAndConditionsScreen/TermsAndConditionsScreen";
import UsernameAndImage from "@features/onboarding/UsernameAndImageScreen";
import { createStackNavigator } from "@react-navigation/stack";

import { OnboardingNavigationParamList, OnboardingRoutes } from "./types";

const Stack = createStackNavigator<OnboardingNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={OnboardingRoutes.Permissions}
    >
      <Stack.Screen
        name={OnboardingRoutes.UsernameAndImage}
        component={UsernameAndImage}
      />
      <Stack.Screen
        name={OnboardingRoutes.FirstTimeGradingSystem}
        component={FirstTimeGradingSystemScreen}
      />
      <Stack.Screen
        name={OnboardingRoutes.TermsAndConditions}
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen
        name={OnboardingRoutes.Permissions}
        component={PermissionsScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
