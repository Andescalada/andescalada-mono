import type {
  PersistedClient,
  Persister,
} from "@tanstack/query-persist-client-core";
import type { MMKV } from "react-native-mmkv";
import * as superjson from "superjson";

interface CreateMMKVStoragePersisterOptions {
  storage: MMKV | undefined;
  key?: string;
  serialize?: (client: PersistedClient) => string;
  deserialize?: (cachedString: string) => PersistedClient;
}

export const createMMKVStoragePersister = ({
  storage,
  key = `REACT_QUERY_OFFLINE_CACHE`,
  serialize = superjson.stringify,
  deserialize = superjson.parse,
}: CreateMMKVStoragePersisterOptions): Persister => {
  if (typeof storage !== "undefined") {
    return {
      persistClient: (persistedClient: PersistedClient) => {
        storage.set(key, serialize(persistedClient));
      },
      restoreClient: async () => {
        const cacheString = storage.getString(key);

        if (!cacheString) {
          return;
        }

        return deserialize(cacheString) as PersistedClient;
      },
      removeClient: () => storage.delete(key),
    };
  }

  return {
    persistClient: noop,
    restoreClient: () => Promise.resolve(undefined),
    removeClient: noop,
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}
