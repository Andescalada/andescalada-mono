import AcceptAgreementsScreen from "@features/InfoAccessManager/AcceptAgreementsScreen";
import AgreementsIntroScreen from "@features/InfoAccessManager/AgreementsIntroScreen";
import MembersScreen from "@features/InfoAccessManager/MembersScreen";
import { createStackNavigator } from "@react-navigation/stack";
import backHeader from "@utils/navigationBackHeader";

import {
  InfoAccessManagerNavigationParamList,
  InfoAccessManagerRoutes,
} from "./types";

const Stack = createStackNavigator<InfoAccessManagerNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={AcceptAgreementsScreen}
        name={InfoAccessManagerRoutes.AcceptAgreements}
      />
      <Stack.Screen
        component={AgreementsIntroScreen}
        name={InfoAccessManagerRoutes.AgreementsIntro}
      />
      <Stack.Screen
        component={MembersScreen}
        name={InfoAccessManagerRoutes.MembersScreen}
        options={{ ...backHeader, title: "Miembros" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
