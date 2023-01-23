import AgreementsIntroScreen from "@features/zoneAgreementManager/AgreementsIntroScreen";
import CampingAgreementScreen from "@features/zoneAgreementManager/CampingAgreementScreen";
import EditAgreementScreen from "@features/zoneAgreementManager/EditAgreementScreen";
import FireAgreementScreen from "@features/zoneAgreementManager/FireAgreementScreen";
import PayAgreementScreen from "@features/zoneAgreementManager/PayAgreementScreen";
import PetsAgreement from "@features/zoneAgreementManager/PetsAgreementScreen";
import ToiletAgreementScreen from "@features/zoneAgreementManager/ToiletAgreementScreen";
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
      <Stack.Screen
        name={ZoneAgreementsRoutes.FireAgreement}
        component={FireAgreementScreen}
        options={{
          title: "Acuerdos clásicos",
          ...backHeader,
        }}
      />
      <Stack.Screen
        name={ZoneAgreementsRoutes.PayAgreement}
        component={PayAgreementScreen}
        options={{
          title: "Acuerdos clásicos",
          ...backHeader,
        }}
      />
      <Stack.Screen
        name={ZoneAgreementsRoutes.ToiletAgreement}
        component={ToiletAgreementScreen}
        options={{
          title: "Acuerdos clásicos",
          ...backHeader,
        }}
      />
      <Stack.Screen
        name={ZoneAgreementsRoutes.EditAgreement}
        component={EditAgreementScreen}
        options={{
          title: "Editar acuerdo",
          ...backHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
