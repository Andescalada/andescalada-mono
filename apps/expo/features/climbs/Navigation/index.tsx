import { Box } from "@andescalada/ui";
import AddAndEditRouteDescription from "@features/climbs/AddAndEditRouteDescription";
import AddAndEditZoneDescription from "@features/climbs/AddAndEditZoneDescription";
import AddRouteScreen from "@features/climbs/AddRouteScreen";
import AddSectorScreen from "@features/climbs/AddSectorScreen";
import AddWallScreen from "@features/climbs/AddWallScreen";
import AdminZoneOptionsScreen from "@features/climbs/AdminZoneOptionsScreen";
import AgreementsIntroScreen from "@features/climbs/AgreementsIntroScreen";
import ClimbsHomeScreen from "@features/climbs/ClimbsHomeScreen";
import EditRoutePositionScreen from "@features/climbs/EditRoutePositionScreen";
import EditWallPositionsScreen from "@features/climbs/EditWallPositionsScreen";
import ManageZoneCoverPhotoScreen from "@features/climbs/ManageZoneCoverPhotoScreen";
import MultiPitchScreen from "@features/climbs/MultiPitchScreen";
import { OtherToposScreen } from "@features/climbs/OtherToposScreen";
import RouteOptionsScreen from "@features/climbs/RouteOptionsScreen";
import RouteScreen from "@features/climbs/RouteScreen";
import SearchClimbsScreen from "@features/climbs/SearchClimbsScreen";
import SectorScreen from "@features/climbs/SectorScreen";
import VerifyInformationScreen from "@features/climbs/VerifyInformationScreen/VerifyInformationScreen";
import WallScreen from "@features/climbs/WallScreen";
import ZoneAgreementsEditorScreen from "@features/climbs/ZoneAgreementsEditorScreen";
import ZoneAgreementsScreen from "@features/climbs/ZoneAgreementsScreen";
import ZoneScreen from "@features/climbs/ZoneScreen";
import ZonesListScreen from "@features/climbs/ZonesListScreen";
import OfflineNotification from "@features/offline/OfflineNotification";
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
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={ClimbsNavigationRoutes.Home}
      >
        <Stack.Screen
          options={{
            header: () => <UserHeader />,
            headerShown: true,
            animationTypeForReplace: "pop",
          }}
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
          options={{
            animationTypeForReplace: "pop",
          }}
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
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.Wall}
          component={WallScreen}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.Route}
          component={RouteScreen}
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
          name={ClimbsNavigationRoutes.AddAndEditZoneDescription}
          component={AddAndEditZoneDescription}
          options={{
            title: `Descripción`,
            ...backHeader,
          }}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.AddAndEditRouteDescription}
          component={AddAndEditRouteDescription}
          options={{
            title: `Descripción`,
            ...backHeader,
          }}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.MultiPitch}
          component={MultiPitchScreen}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.EditRoutePosition}
          component={EditRoutePositionScreen}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.VerifyInformation}
          component={VerifyInformationScreen}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.OtherTopos}
          component={OtherToposScreen}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.EditWallPositions}
          component={EditWallPositionsScreen}
        />
        <Stack.Screen
          name={ClimbsNavigationRoutes.ManageZoneCoverPhotoScreen}
          component={ManageZoneCoverPhotoScreen}
          options={{
            title: `Foto de portada`,
            ...backHeader,
          }}
        />
      </Stack.Navigator>
      <OfflineNotification />
    </Box>
  );
};

export default Navigator;
