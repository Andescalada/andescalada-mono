import AcceptAgreementsScreen from "@features/InfoAccessManager/AcceptAgreementsScreen";
import { createStackNavigator } from "@react-navigation/stack";

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
    </Stack.Navigator>
  );
};

export default Navigator;
