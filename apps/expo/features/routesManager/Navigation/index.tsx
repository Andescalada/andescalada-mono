import RouteDrawerScreen from "@features/routesManager/RouteDrawerScreen";
import RouteExtensionDrawerScreen from "@features/routesManager/RouteExtensionDrawerScreen";
import TopoViewerScreen from "@features/routesManager/TopoViewerScreen";
import { createStackNavigator } from "@react-navigation/stack";

import {
  RoutesManagerNavigationParamList,
  RoutesManagerNavigationRoutes,
} from "./types";

const Stack = createStackNavigator<RoutesManagerNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.RouteDrawer}
        component={RouteDrawerScreen}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.TopoViewer}
        component={TopoViewerScreen}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.RouteExtensionDrawer}
        component={RouteExtensionDrawerScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
