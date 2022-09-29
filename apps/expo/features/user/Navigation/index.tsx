import FirstTimeLoginScreen from "@features/user/FirstTimeLoginScreen";
import { createStackNavigator } from "@react-navigation/stack";

import { UserNavigationParamList, UserNavigationRoutes } from "./types";

const Stack = createStackNavigator<UserNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={UserNavigationRoutes.FirstTimeLogin}
    >
      <Stack.Screen
        name={UserNavigationRoutes.FirstTimeLogin}
        component={FirstTimeLoginScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
