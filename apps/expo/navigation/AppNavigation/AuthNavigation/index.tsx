import { createStackNavigator } from '@react-navigation/stack';

import {
  AuthNavigationNavigationParamList,
  AuthNavigationRoutes,
} from '@navigation/AppNavigation/AuthNavigation/types';
import LoginScreen from '@features/auth/LoginScreen';

const Stack = createStackNavigator<AuthNavigationNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AuthNavigationRoutes.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
