import { createStackNavigator } from '@react-navigation/stack';

import {
  ClimbsNavigationRoutes,
  ClimbsNavigationNavigationParamList,
} from './types';
import ZonesListScreen from '@features/climbs/ZonesListScreen';
import ZoneScreen from '@features/climbs/ZoneScreen';
import AddSectorScreen from '@features/climbs/AddSectorScreen';
import SectorScreen from '@features/climbs/SectorScreen';
import AddWallScreen from '@features/climbs/AddWallScreen';
import WallScreen from '@features/climbs/WallScreen';
import AddRouteScreen from '@features/climbs/AddRouteScreen';
import { EditTopoScreen } from '@features/routesManager';

const Stack = createStackNavigator<ClimbsNavigationNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ClimbsNavigationRoutes.ZonesList}
        component={ZonesListScreen}
      />
      <Stack.Screen name={ClimbsNavigationRoutes.Zone} component={ZoneScreen} />
      <Stack.Screen
        name={ClimbsNavigationRoutes.AddZone}
        component={AddSectorScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name={ClimbsNavigationRoutes.Sector}
        component={SectorScreen}
      />
      <Stack.Screen
        name={ClimbsNavigationRoutes.AddWall}
        component={AddWallScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name={ClimbsNavigationRoutes.AddRoute}
        component={AddRouteScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name={ClimbsNavigationRoutes.Wall} component={WallScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
