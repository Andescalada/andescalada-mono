import { transformer } from "@andescalada/api/src/transformer";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { httpBatchLink } from "@trpc/client";
import Env from "@utils/env";
import { createMMKVStoragePersister } from "@utils/mmkv/createMMKVPersister";
import storage from "@utils/mmkv/storage";
import { trpc } from "@utils/trpc";
import Constants from "expo-constants";
import { FC, ReactNode, useState } from "react";
import { addPlugin } from "react-query-native-devtools";
import * as Sentry from "sentry-expo";

export interface AccessToken {
  exp: number;
}

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const persister = createMMKVStoragePersister({ storage: storage });

interface Props {
  accessToken: string;
  firstTimeLogin?: true;
  children: ReactNode;
}

const localHost =
  Constants.manifest2?.extra?.expoGo?.debuggerHost ||
  Constants.manifest?.debuggerHost;

const url =
  process.env.APP_VARIANT === "development"
    ? `http://${localHost?.split(":").shift()}:3000`
    : Env.API_URL;

const TRPCProvider: FC<Props> = ({ accessToken, children }) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        mutations: {
          cacheTime: Infinity,
          retry: true,
        },
        queries: {
          networkMode: "offlineFirst",
          retry: false,
          staleTime: 1 * (60 * 1000), // 5 mins
          cacheTime: 5 * (60 * 1000), // 10 mins
        },
      },
    });
    if (__DEV__) addPlugin({ queryClient: client });
    return client;
  });
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${url}/api/trpc`,

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
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
        onSuccess={() => {
          queryClient.resumePausedMutations().then((mutations) => {
            Sentry.Native.captureMessage(
              "resumed paused mutations: " + mutations,
            );
            queryClient.invalidateQueries();
          });
        }}
      >
        {children}
      </PersistQueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCProvider;
