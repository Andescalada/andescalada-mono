import SelectRouteToDrawScreen from '@features/routesManager/SelectRouteToDrawScreen';
import { createStackNavigator } from '@react-navigation/stack';

import {
  RouteManagerNavigationRoutes,
  RouteManagerNavigationParamList,
} from './types';

const Stack = createStackNavigator<RouteManagerNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RouteManagerNavigationRoutes.SelectRouteToDraw}
        component={SelectRouteToDrawScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
