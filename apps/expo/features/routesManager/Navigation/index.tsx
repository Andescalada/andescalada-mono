import { BackButton } from "@andescalada/ui";
import textVariants from "@andescalada/ui/Theme/textVariants";
import RouteDrawer from "@features/routesManager/RouteDrawer";
import SelectRouteToDrawScreen from "@features/routesManager/SelectRouteToDrawScreen";
import { TopoViewerScreen } from "@features/routesManager/TopoViewerScreen/index";
import { createStackNavigator } from "@react-navigation/stack";

import {
  RoutesManagerNavigationParamList,
  RoutesManagerNavigationRoutes,
} from "./types";

const { fontFamily, fontSize, lineHeight } = textVariants.p1R;

const Stack = createStackNavigator<RoutesManagerNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.SelectRouteToDraw}
        component={SelectRouteToDrawScreen}
        options={{
          title: "Editar topo",
          headerShown: true,
          headerTitleStyle: { fontFamily, fontSize, lineHeight },
          headerLeft({ onPress }) {
            return <BackButton onPress={onPress} marginLeft="s" />;
          },
        }}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.DrawRoute}
        component={RouteDrawer}
      />
      <Stack.Screen
        name={RoutesManagerNavigationRoutes.TopoViewer}
        component={TopoViewerScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
