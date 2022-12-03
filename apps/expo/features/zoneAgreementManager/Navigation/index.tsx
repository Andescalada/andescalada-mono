import AgreementsIntroScreen from "@features/zoneAgreementManager/AgreementsIntroScreen";
import CampingAgreementScreen from "@features/zoneAgreementManager/CampingAgreementScreen";
import PetsAgreement from "@features/zoneAgreementManager/PetsAgreementScreen";
import { createStackNavigator } from "@react-navigation/stack";
import backHeader from "@utils/navigationBackHeader";

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
      <Stack.Screen
        name={ZoneAgreementsRoutes.PetsAgreement}
        component={PetsAgreement}
        options={{
          title: "Acuerdos clásicos",
          ...backHeader,
        }}
      />
      <Stack.Screen
        name={ZoneAgreementsRoutes.CampingAgreement}
        component={CampingAgreementScreen}
        options={{
          title: "Acuerdos clásicos",
          ...backHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
