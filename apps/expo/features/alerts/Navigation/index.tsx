import AddRouteAlertScreen from "@features/alerts/AddRouteAlertScreen";
import { createStackNavigator } from "@react-navigation/stack";

import { AlertsNavigationParamList, AlertsRoutes } from "./types";

const Stack = createStackNavigator<AlertsNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={AlertsRoutes.AddRouteAlert}
        component={AddRouteAlertScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
