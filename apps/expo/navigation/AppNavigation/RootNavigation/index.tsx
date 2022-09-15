import { createStackNavigator } from '@react-navigation/stack';

import {
  RootNavigationRoutes,
  RootNavigationNavigationParamList,
} from '@navigation/AppNavigation/RootNavigation/types';
import ZonesListScreen from '@features/climbs/ZonesListScreen';
import ZoneScreen from '@features/climbs/ZoneScreen';
import { transformer, trpc } from '@utils/trpc';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Constants from 'expo-constants';
import { FC } from 'react';
import AddSectorScreen from '@features/climbs/AddSectorScreen';
import SectorScreen from '@features/climbs/SectorScreen';
import AddWallScreen from '@features/climbs/AddWallScreen';

const { manifest } = Constants;

export interface AccessToken {
  exp: number;
}

const Stack = createStackNavigator<RootNavigationNavigationParamList>();

interface Props {
  accessToken: string;
}

const localhost = `http://${manifest?.debuggerHost?.split(':').shift()}:3000`;

const Navigator: FC<Props> = ({ accessToken }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: `${localhost}/api/trpc`,

      async headers() {
        return {
          Authorization: `Bearer ${accessToken}`,
        };
      },
      transformer,
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name={RootNavigationRoutes.ZonesList}
            component={ZonesListScreen}
          />
          <Stack.Screen
            name={RootNavigationRoutes.Zone}
            component={ZoneScreen}
          />
          <Stack.Screen
            name={RootNavigationRoutes.AddZone}
            component={AddSectorScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen
            name={RootNavigationRoutes.Sector}
            component={SectorScreen}
          />
          <Stack.Screen
            name={RootNavigationRoutes.AddWall}
            component={AddWallScreen}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Navigator;
