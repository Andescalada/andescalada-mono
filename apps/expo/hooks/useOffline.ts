import { AppRouter } from "@andescalada/api/src/routers/_app";
import { transformer } from "@andescalada/api/src/transformer";
import { trpc } from "@andescalada/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { getThumbnail, optimizedImage } from "@utils/cloudinary";
import Env from "@utils/env";
import featureFlags from "@utils/featureFlags";
import { storeImage } from "@utils/FileSystem/storeImage";
import storage, { Storage } from "@utils/mmkv/storage";
import offlineDb from "@utils/quick-sqlite";
import Constants from "expo-constants";
import { parse, stringify } from "superjson";

const localHost =
  Constants.manifest2?.extra?.expoGo?.debuggerHost ||
  Constants.manifest?.debuggerHost;

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

const useOffline = () => {
  console.log("useOffline disabled");
};

const useOffline1 = () => {
  const queryClient = useQueryClient();

  const { data } = trpc.user.getDownloadedAssets.useQuery(undefined, {
    enabled: featureFlags.offline,
  });
  const utils = trpc.useContext();

  if (!data) return;

  storage.set(Storage.DOWNLOADED_ASSETS, stringify(data));

  data.forEach(async (asset) => {
    const { params, path, version, zoneId } = asset;
    Object.defineProperty;
    const selectedUtils = lookup(utils, path);
    const selectedClient = lookup(client, path);

    const savedData = offlineDb.get(
      stringify({ path, params, version }),
      zoneId,
    );
    if (savedData) {
      const parsedData = parse(savedData);
      selectedUtils.setData(parsedData);
    } else {
      const data = await selectedClient.query(params);
      await offlineDb.set(stringify({ path, params, version }), zoneId, data);

      storage.set(stringify({ path, params }), stringify(data));
      selectedUtils.setData(data);
      if ("image" in data) {
        if (data.image.publicId === undefined || data.image.publicId === null)
          return;
        const optimizedUrl = optimizedImage(data.image.publicId);
        const thumbnailUrl = getThumbnail(data.image.publicId);
        optimizedUrl && storeImage(optimizedUrl, "permanent");
        thumbnailUrl && storeImage(thumbnailUrl, "permanent");
      }
    }

    // const data = await selectedUtils.fetch(params);
  });
};

// const AppRouter = lookup(appRouter, "sectors.allWall");

export default useOffline;

type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ?
        | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> &
            string}`
        | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
  : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;

type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

declare function lookup<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P>;
