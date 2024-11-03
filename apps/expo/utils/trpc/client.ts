import { AppRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import Env from "@utils/env";
import storage, { Storage } from "@utils/mmkv/storage";
import Constants from "expo-constants";

const localHost =
  Constants.manifest2?.extra?.expoGo?.debuggerHost ||
  Constants.expoConfig?.extra?.expoGo?.debuggerHost;

const url = __DEV__
  ? `http://${localHost?.split(":").shift()}:3000`
  : Env.API_URL;

const accessToken = () => {
  return storage.getString(Storage.ACCESS_TOKEN);
};

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${url}/api/trpc`,

      async headers() {
        return {
          Authorization: `Bearer ${accessToken()}`,
        };
      },
    }),
  ],
  transformer,
});

export default client;
