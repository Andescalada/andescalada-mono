import RouteDrawer from "@features/routesManager/RouteDrawer";
import SelectRouteToDrawScreen from "@features/routesManager/SelectRouteToDrawScreen";
import TopoViewer from "@features/routesManager/TopoViewer";
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
        name={RoutesManagerNavigationRoutes.SelectRouteToDraw}
        component={SelectRouteToDrawScreen}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.DrawRoute}
        component={RouteDrawer}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.TopoViewer}
        component={TopoViewer}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
