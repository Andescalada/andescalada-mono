import { ActivityIndicator, LoadingScreen, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import ClimbsStackNavigation from "@features/climbs/Navigation";
import RouteManagerStackNavigation from "@features/routesManager/Navigation";
import FirstTimeLoginScreen from "@features/user/FirstTimeLoginScreen";
import UserStackNavigation from "@features/user/Navigation";
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
  const { data, isLoading } = trpc.user.ownInfo.useQuery();
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
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
