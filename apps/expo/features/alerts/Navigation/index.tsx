import AddRouteAlertScreen from "@features/alerts/AddRouteAlertScreen";
import RouteAlertsListScreen from "@features/alerts/RouteAlertsListScreen";
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
      <Stack.Screen
        name={AlertsRoutes.RouteAlertsList}
        component={RouteAlertsListScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
