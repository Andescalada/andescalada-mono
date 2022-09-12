import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { transformer, trpc } from './utils/trpc';
import { login, refreshTokens } from './utils/auth0';
import NavigationMemoized from '@navigation/NavigationMemoized';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from '@assets/Constants';
import jwtDecode from 'jwt-decode';
import { isExpired } from '@utils/decode';
import AppNavigation from '@navigation/AppNavigation';

const { manifest } = Constants;

export interface AccessToken {
  exp: number;
}

const localhost = `http://${manifest?.debuggerHost?.split(':').shift()}:3000`;

export default function App() {
  const [accessToken, setAccessToken] = useState<null | string>(null);
  const [queryClient] = useState(() => new QueryClient());
  console.log(localhost);
  const [trpcClient, setTrpcClient] = useState(() =>
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

  const [name, setName] = useState<string | null>(null);

  const onLogin = async () => {
    const { accessToken: aT } = await login();
    setTrpcClient(() =>
      trpc.createClient({
        url: `${localhost}/api/trpc`,

        async headers() {
          return {
            Authorization: `Bearer ${aT}`,
          };
        },
        transformer,
      }),
    );

    setAccessToken(aT);
  };

  const [isAuth, setIsAuth] = useState(false);

  const isLoggedIn = async () => {
    const token = await AsyncStorage.getItem(Storage.ACCESS_TOKEN);
    if (!token) return false;
    const decodedToken: AccessToken = jwtDecode(token);
    const hasExpired = isExpired(decodedToken.exp);
    if (!hasExpired) return true;
    await refreshTokens();
    return true;
  };

  const updateAccessToken = async () => {
    const token = await AsyncStorage.getItem(Storage.ACCESS_TOKEN);
    setTrpcClient(() =>
      trpc.createClient({
        url: `${localhost}/api/trpc`,

        async headers() {
          return {
            Authorization: `Bearer ${token}`,
          };
        },
        transformer,
      }),
    );
  };

  const checkIsAuth = useCallback(async () => {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) setIsAuth(false);
    await updateAccessToken();
    setIsAuth(true);
  }, []);

  useEffect(() => {
    checkIsAuth();
  }, [checkIsAuth]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NavigationMemoized>
          <StatusBar style="auto" />
          <AppNavigation isAuth={isAuth} />
        </NavigationMemoized>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
