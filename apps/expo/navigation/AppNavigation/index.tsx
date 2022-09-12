import { FC, useCallback, useEffect } from 'react';
import RootNavigation from '@navigation/AppNavigation/RootNavigation';
import AuthNavigation from '@navigation/AppNavigation/AuthNavigation';
import { transformer, trpc } from '@utils/trpc';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import Constants from 'expo-constants';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from '@assets/Constants';
import jwtDecode from 'jwt-decode';
import { isExpired } from '@utils/decode';
import { refreshTokens } from '@utils/auth0';
import { setIsAuth } from '@store/auth';
const { manifest } = Constants;

export interface AccessToken {
  exp: number;
}

const localhost = `http://${manifest?.debuggerHost?.split(':').shift()}:3000`;

const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem(Storage.ACCESS_TOKEN);
  if (!token) return false;
  const decodedToken: AccessToken = jwtDecode(token);
  const hasExpired = isExpired(decodedToken.exp);
  if (!hasExpired) return true;
  await refreshTokens();
  return true;
};

const Navigator = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient, setTrpcClient] = useState(() =>
    trpc.createClient({
      url: `${localhost}/api/trpc`,

      async headers() {
        return {};
      },
      transformer,
    }),
  );

  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
    if (!loggedIn) {
      dispatch(setIsAuth(false));
      return;
    }
    dispatch(setIsAuth(true));
  }, [dispatch]);

  useEffect(() => {
    checkIsAuth();
  }, [checkIsAuth]);

  useEffect(() => {
    if (isAuth) updateAccessToken();
  }, [isAuth]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {isAuth ? <RootNavigation /> : <AuthNavigation />}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Navigator;
