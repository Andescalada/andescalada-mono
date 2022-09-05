import ZonesList from '@zart/react-native/zonesLists';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { enableScreens } from 'react-native-screens';
import { QueryClient, QueryClientProvider } from 'react-query';
import { transformer, trpc } from './utils/trpc';
import * as AuthSession from 'expo-auth-session';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@env';
import jwtDecode from 'jwt-decode';

// enableScreens(true);
const { manifest } = Constants;

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const authorizationEndpoint = `https://${AUTH0_DOMAIN}/authorize`;

const localhost = `http://${manifest?.debuggerHost?.split(':').shift()}:3000`;

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: `${localhost}/api/trpc`,

      async headers() {
        return {};
      },
      transformer,
    }),
  );

  const [name, setName] = useState<string | null>(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: AUTH0_CLIENT_ID,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint },
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  useEffect(() => {
    if (result) {
      if (result?.type === 'error') {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong',
        );
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        console.log(result.params);
        const decoded: { name: string } = jwtDecode(jwtToken);

        const { name } = decoded;
        console.log(decoded);
        setName(name);
      }
    }
  }, [result]);

  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* <SafeAreaProvider> */}
        <StatusBar style="dark" />
        <View style={styles.container}>
          {name ? (
            <>
              <Text style={styles.title}>You are logged in, {name}!</Text>
              <Button title="Log out" onPress={() => setName(null)} />
            </>
          ) : (
            <Button
              disabled={!request}
              title="Log in with Auth0"
              onPress={() => promptAsync({ useProxy })}
            />
          )}
        </View>
        {/* <ZonesList /> */}
        {/* </SafeAreaProvider> */}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});
