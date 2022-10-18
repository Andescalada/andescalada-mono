import { Box } from "@andescalada/ui";
import AddRouteScreen from "@features/climbs/AddRouteScreen";
import AddSectorScreen from "@features/climbs/AddSectorScreen";
import AddWallScreen from "@features/climbs/AddWallScreen";
import OfflineNotification from "@features/climbs/components/OfflineNotification";
import SectorScreen from "@features/climbs/SectorScreen";
import WallScreen from "@features/climbs/WallScreen";
import ZoneScreen from "@features/climbs/ZoneScreen";
import ZonesListScreen from "@features/climbs/ZonesListScreen";
import UserHeader from "@features/user/components/UserHeader/UserHeader";
import { createStackNavigator } from "@react-navigation/stack";

import {
  ClimbsNavigationNavigationParamList,
  ClimbsNavigationRoutes,
} from "./types";

const Stack = createStackNavigator<ClimbsNavigationNavigationParamList>();

const Navigator = () => {
  return (
    <Box flex={1}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={ClimbsNavigationRoutes.ZonesList}
      >
        <Stack.Screen
          name={ClimbsNavigationRoutes.ZonesList}
          component={ZonesListScreen}
          options={{ header: () => <UserHeader />, headerShown: true }}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.Zone}
          component={ZoneScreen}
        />
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
        <Stack.Screen
          name={ClimbsNavigationRoutes.Wall}
          component={WallScreen}
        />
      </Stack.Navigator>
      <OfflineNotification />
    </Box>
  );
};

export default Navigator;
