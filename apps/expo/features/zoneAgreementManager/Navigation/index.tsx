import AgreementsIntroScreen from "@features/zoneAgreementManager/AgreementsIntroScreen";
import { createStackNavigator } from "@react-navigation/stack";

import {
  ZoneAgreementsNavigationParamList,
  ZoneAgreementsRoutes,
} from "./types";

const Stack = createStackNavigator<ZoneAgreementsNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ZoneAgreementsRoutes.AgreementsIntro}
        component={AgreementsIntroScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
