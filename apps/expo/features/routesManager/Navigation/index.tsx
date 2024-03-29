import MultiPitchDrawerScreen from "@features/routesManager/MultiPitchDrawerScreen";
import RouteDrawerScreen from "@features/routesManager/RouteDrawerScreen";
import RouteExtensionDrawerScreen from "@features/routesManager/RouteExtensionDrawerScreen";
import RouteVariantDrawerScreen from "@features/routesManager/RouteVariantDrawerScreen";
import TopoManagerScreen from "@features/routesManager/TopoManagerScreen";
import { ToposByUserScreen } from "@features/routesManager/ToposByUserScreen";
import TopoViewerScreen from "@features/routesManager/TopoViewerScreen";
import { UploadTopoImageScreen } from "@features/routesManager/UploadTopoImageScreen";
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
        name={RoutesManagerNavigationRoutes.TopoManager}
        component={TopoManagerScreen}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.RouteExtensionDrawer}
        component={RouteExtensionDrawerScreen}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.RouteVariantDrawer}
        component={RouteVariantDrawerScreen}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.UploadTopoImage}
        component={UploadTopoImageScreen}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.ToposByUser}
        component={ToposByUserScreen}
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
