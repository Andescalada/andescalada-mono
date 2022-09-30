import { ActivityIndicator, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import ClimbsStackNavigation from "@features/climbs/Navigation";
import RouteManagerStackNavigation from "@features/routesManager/Navigation";
import UserNavigationStack from "@features/user/Navigation";
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
  if (data?.firstLogin) return <UserNavigationStack />;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen
          name={RootNavigationRoutes.Climbs}
          component={ClimbsStackNavigation}
        />
        <Stack.Screen
          name={RootNavigationRoutes.RouteManager}
          component={RouteManagerStackNavigation}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Navigator;
