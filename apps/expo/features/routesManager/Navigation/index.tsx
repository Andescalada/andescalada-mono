import MultiPitchDrawerScreen from "@features/routesManager/MultiPitchDrawerScreen";
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
        detachPreviousScreen: true,
      }}
    >
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
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.MultiPitchDrawer}
        component={MultiPitchDrawerScreen}
        options={{ gestureEnabled: false, gestureResponseDistance: 0 }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
