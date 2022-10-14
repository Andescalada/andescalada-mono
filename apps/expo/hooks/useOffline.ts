import { trpc } from "@andescalada/utils/trpc";
import type { Zone } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { persistQueryClientSubscribe } from "@tanstack/react-query-persist-client";
import { createMMKVStoragePersister } from "@utils/mmkv/createMMKVPersister";
import storage from "@utils/mmkv/storage";

const persister = createMMKVStoragePersister({ storage });

interface Args {
  zoneId: Zone["id"];
}

const useOffline = ({ zoneId }: Args) => {
  const queryClient = useQueryClient();

  const a = queryClient.getMutationCache();

  const downloadList = trpc.zones.downloadList.useQuery(
    { zoneId },
    { enabled: false },
  );

  const unsuscribe = persistQueryClientSubscribe({
    queryClient,
    persister,
    dehydrateOptions: {
      shouldDehydrateQuery: ({ queryKey, queryHash }) => {
        console.log(queryKey);
        return true;
      },
    },
  });
};

export default useOffline;
