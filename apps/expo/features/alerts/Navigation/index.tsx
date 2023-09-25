import AddRouteAlertScreen from "@features/alerts/AddRouteAlertScreen";
import RouteAlertScreen from "@features/alerts/RouteAlertScreen";
import RouteAlertsListScreen from "@features/alerts/RouteAlertsListScreen";
import { createStackNavigator } from "@react-navigation/stack";
import backHeader from "@utils/navigationBackHeader";

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
        options={{ ...backHeader, title: "Alertas de rutas" }}
      />
      <Stack.Screen
        name={AlertsRoutes.RouteAlert}
        component={RouteAlertScreen}
        options={{ ...backHeader, title: "Alerta" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
