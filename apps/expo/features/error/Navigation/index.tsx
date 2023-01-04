import FallbackErrorScreen from "@features/error/FallbackErrorScreen";
import { createStackNavigator } from "@react-navigation/stack";

import { ErrorNavigationParamList, ErrorRoutes } from "./types";

const Stack = createStackNavigator<ErrorNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={FallbackErrorScreen}
        name={ErrorRoutes.FallbackError}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
