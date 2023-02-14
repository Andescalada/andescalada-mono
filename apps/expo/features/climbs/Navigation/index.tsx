import { Box } from "@andescalada/ui";
import AddAndEditDescription from "@features/climbs/AddAndEditDescription";
import AddRouteScreen from "@features/climbs/AddRouteScreen";
import AddSectorScreen from "@features/climbs/AddSectorScreen";
import AddWallScreen from "@features/climbs/AddWallScreen";
import AdminZoneOptionsScreen from "@features/climbs/AdminZoneOptionsScreen";
import AgreementsIntroScreen from "@features/climbs/AgreementsIntroScreen";
import ClimbsHomeScreen from "@features/climbs/ClimbsHomeScreen";
import RouteOptionsScreen from "@features/climbs/RouteOptionsScreen";
import SearchClimbsScreen from "@features/climbs/SearchClimbsScreen";
import SectorScreen from "@features/climbs/SectorScreen";
import WallScreen from "@features/climbs/WallScreen";
import ZoneAgreementsEditorScreen from "@features/climbs/ZoneAgreementsEditorScreen";
import ZoneAgreementsScreen from "@features/climbs/ZoneAgreementsScreen";
import ZoneScreen from "@features/climbs/ZoneScreen";
import ZonesListScreen from "@features/climbs/ZonesListScreen";
import OfflineNotification from "@features/offline/OfflineNotification";
import OfflineUpdateNotification from "@features/offline/OfflineUpdateNotification";
import UserHeader from "@features/user/components/UserHeader/UserHeader";
import { createStackNavigator } from "@react-navigation/stack";
import backHeader from "@utils/navigationBackHeader";

import {
  ClimbsNavigationNavigationParamList,
  ClimbsNavigationRoutes,
} from "./types";

const Stack = createStackNavigator<ClimbsNavigationNavigationParamList>();

const Navigator = () => {
  return (
    <Box flex={1}>
      <OfflineUpdateNotification />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={ClimbsNavigationRoutes.Home}
      >
        <Stack.Screen
          options={{ header: () => <UserHeader />, headerShown: true }}
          name={ClimbsNavigationRoutes.Home}
          component={ClimbsHomeScreen}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.ZonesList}
          component={ZonesListScreen}
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
          name={ClimbsNavigationRoutes.SearchClimbs}
          component={SearchClimbsScreen}
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
        <Stack.Screen
          name={ClimbsNavigationRoutes.AgreementsIntro}
          component={AgreementsIntroScreen}
        />

        <Stack.Screen
          name={ClimbsNavigationRoutes.RouteOptions}
          component={RouteOptionsScreen}
          options={{
            title: "Opciones",
            ...backHeader,
          }}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.AdminZoneOptions}
          component={AdminZoneOptionsScreen}
          options={{
            title: `Opciones`,
            ...backHeader,
          }}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.ZoneAgreementsEditor}
          component={ZoneAgreementsEditorScreen}
          options={{
            title: `Acuerdos`,
            ...backHeader,
          }}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.ZoneAgreements}
          component={ZoneAgreementsScreen}
          options={{
            title: `Acuerdos`,
            ...backHeader,
          }}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.AddAndEditDescription}
          component={AddAndEditDescription}
          options={{
            title: `Descripción`,
            ...backHeader,
          }}
        />
      </Stack.Navigator>
      <OfflineNotification />
    </Box>
  );
};

export default Navigator;
