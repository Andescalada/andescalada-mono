import { transformer } from "@andescalada/api/src/transformer";
import ClimbsStackNavigation from "@features/climbs/Navigation";
import RouteManagerStackNavigation from "@features/routesManager/Navigation";
import {
  RootNavigationNavigationParamList,
  RootNavigationRoutes,
} from "@navigation/AppNavigation/RootNavigation/types";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@utils/trpc";
import Constants from "expo-constants";
import { FC, useState } from "react";

const { manifest } = Constants;

export interface AccessToken {
  exp: number;
}

const Stack = createStackNavigator<RootNavigationNavigationParamList>();

interface Props {
  accessToken: string;
}

const localhost = __DEV__
  ? `http://${manifest?.debuggerHost?.split(":").shift()}:3000`
  : "https://andescalada-mono-git-main-andescalada.vercel.app";

const Navigator: FC<Props> = ({ accessToken }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${localhost}/api/trpc`,

          async headers() {
            return {
              Authorization: `Bearer ${accessToken}`,
            };
          },
        }),
      ],
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
          <Stack.Screen
            name={RootNavigationRoutes.RouteManager}
            component={RouteManagerStackNavigation}
          />
        </Stack.Navigator>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Navigator;
