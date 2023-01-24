import { ActivityIndicator, LoadingScreen, Screen } from "@andescalada/ui";
import ClimbsStackNavigation from "@features/climbs/Navigation";
import FallbackErrorScreen from "@features/error/FallbackErrorScreen";
import ErrorStackNavigation from "@features/error/Navigation";
import ImageManagerNavigation from "@features/imageManager/Navigation";
import InfoAccessManager from "@features/InfoAccessManager/Navigation";
import useOffline from "@features/offline/useOffline";
import RouteManagerStackNavigation from "@features/routesManager/Navigation";
import FirstTimeLoginScreen from "@features/user/FirstTimeLoginScreen";
import UserStackNavigation from "@features/user/Navigation";
import ZoneAgreementsNavigation from "@features/zoneAgreementManager/Navigation";
import ZoneLocationStackNavigation from "@features/zoneLocation/Navigation";
import ZoneManagerStackNavigation from "@features/zoneManager/Navigation";
import useOwnInfo from "@hooks/useOwnInfo";
import usePushNotification from "@hooks/usePushNotification";
import {
  RootNavigationNavigationParamList,
  RootNavigationRoutes,
} from "@navigation/AppNavigation/RootNavigation/types";
import { createStackNavigator } from "@react-navigation/stack";

export interface AccessToken {
  exp: number;
}

const Stack = createStackNavigator<RootNavigationNavigationParamList>();

const Navigator = () => {
  const { data, isLoading, isError } = useOwnInfo({ withInitialData: false });

  useOffline({ fetchAssets: true });
  usePushNotification();

  if (isError) {
    return <FallbackErrorScreen />;
  }

  if (isLoading)
    return (
      <Screen
        justifyContent="center"
        alignItems="center"
        backgroundColor={"transitionScreen"}
      >
        <ActivityIndicator size={"large"} />
      </Screen>
    );

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RootNavigationRoutes.Climbs}
    >
      {isLoading ? (
        <Stack.Screen
          name={RootNavigationRoutes.Loading}
          component={LoadingScreen}
          options={{ presentation: "modal" }}
        />
      ) : data?.firstLogin ? (
        <Stack.Screen
          name={RootNavigationRoutes.FirstTimeLogin}
          component={FirstTimeLoginScreen}
          options={{ presentation: "modal" }}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen
            name={RootNavigationRoutes.Climbs}
            component={ClimbsStackNavigation}
          />
          <Stack.Screen
            name={RootNavigationRoutes.RouteManager}
            component={RouteManagerStackNavigation}
          />
          <Stack.Screen
            name={RootNavigationRoutes.User}
            component={UserStackNavigation}
          />
          <Stack.Screen
            name={RootNavigationRoutes.ZoneAgreementsManager}
            component={ZoneAgreementsNavigation}
          />
          <Stack.Screen
            name={RootNavigationRoutes.ImageManager}
            component={ImageManagerNavigation}
          />
          <Stack.Screen
            name={RootNavigationRoutes.ZoneLocation}
            component={ZoneLocationStackNavigation}
          />
          <Stack.Screen
            name={RootNavigationRoutes.ZoneManager}
            component={ZoneManagerStackNavigation}
          />
          <Stack.Screen
            name={RootNavigationRoutes.Error}
            component={ErrorStackNavigation}
          />
          <Stack.Screen
            name={RootNavigationRoutes.InfoAccessManager}
            component={InfoAccessManager}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
