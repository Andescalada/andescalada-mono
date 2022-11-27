import RouteDrawerScreen from "@features/routesManager/RouteDrawerScreen";
import TopoViewerScreen from "@features/routesManager/TopoViewerScreen/index";
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
    </Stack.Navigator>
  );
};

export default Navigator;
