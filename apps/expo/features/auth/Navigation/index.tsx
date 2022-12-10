import EnterCodeScreen from "@features/auth/EnterCodeScreen";
import EnterEmailScreen from "@features/auth/EnterEmailScreen";
import LoginScreen from "@features/auth/LoginScreen/";
import {
  AuthNavigationNavigationParamList,
  AuthNavigationRoutes,
} from "@features/auth/Navigation/types";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<AuthNavigationNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AuthNavigationRoutes.Login} component={LoginScreen} />
      <Stack.Screen
        name={AuthNavigationRoutes.EnterEmail}
        component={EnterEmailScreen}
      />
      <Stack.Screen
        name={AuthNavigationRoutes.EnterCode}
        component={EnterCodeScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
