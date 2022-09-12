import { createStackNavigator } from '@react-navigation/stack';

import {
  RootNavigationRoutes,
  RootNavigationNavigationParamList,
} from '@navigation/AppNavigation/RootNavigation/types';
import ZonesScreen from '@features/zones/ZonesScreen';

const Stack = createStackNavigator<RootNavigationNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RootNavigationRoutes.Placeholder}
        component={ZonesScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
