import { createStackNavigator } from '@react-navigation/stack';

import {
  RootNavigationRoutes,
  RootNavigationNavigationParamList,
} from '@navigation/AppNavigation/RootNavigation/types';
import { transformer, trpc } from '@utils/trpc';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Constants from 'expo-constants';
import ClimbsStackNavigation from '@navigation/AppNavigation/RootNavigation/ClimbsNavigation';
import { FC } from 'react';

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
            name={RootNavigationRoutes.Climbs}
            component={ClimbsStackNavigation}
          />
        </Stack.Navigator>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Navigator;
