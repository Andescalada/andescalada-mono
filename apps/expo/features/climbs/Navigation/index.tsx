import AddRouteScreen from "@features/climbs/AddRouteScreen";
import AddSectorScreen from "@features/climbs/AddSectorScreen";
import AddWallScreen from "@features/climbs/AddWallScreen";
import SectorScreen from "@features/climbs/SectorScreen";
import WallScreen from "@features/climbs/WallScreen";
import ZoneScreen from "@features/climbs/ZoneScreen";
import ZonesListScreen from "@features/climbs/ZonesListScreen";
import { createStackNavigator } from "@react-navigation/stack";

import {
  ClimbsNavigationNavigationParamList,
  ClimbsNavigationRoutes,
} from "./types";

const Stack = createStackNavigator<ClimbsNavigationNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ClimbsNavigationRoutes.ZonesList}
        component={ZonesListScreen}
      />
      <Stack.Screen name={ClimbsNavigationRoutes.Zone} component={ZoneScreen} />
      <Stack.Screen
        name={ClimbsNavigationRoutes.AddSector}
        component={AddSectorScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name={ClimbsNavigationRoutes.Sector}
        component={SectorScreen}
      />
      <Stack.Screen
        name={ClimbsNavigationRoutes.AddWall}
        component={AddWallScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name={ClimbsNavigationRoutes.AddRoute}
        component={AddRouteScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name={ClimbsNavigationRoutes.Wall} component={WallScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
