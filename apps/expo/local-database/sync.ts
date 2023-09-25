import { Keys, LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { Table } from "@local-database/model/schema";
import { synchronize } from "@nozbe/watermelondb/sync";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import client from "@utils/trpc/client";

const sync = async () => {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      const res = await client.sync.pull.query({
        lastPulledAt: new Date(lastPulledAt ?? 0),
        tables: Object.values(Table),
      });

      return res;
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      await client.sync.push.mutate({
        changes,
        lastPulledAt: new Date(lastPulledAt),
      });
    },
    migrationsEnabledAtVersion: 1,
  });

  return true;
};

export const useWatermelonSync = () => {
  const queryClient = useQueryClient();

  const sync = () => queryClient.invalidateQueries([LOCAL_DATABASE, Keys.Sync]);

  return sync;
};

export const useWatermelon = () => {
  const syncQuery = useQuery([LOCAL_DATABASE, Keys.Sync], sync, {
    retry: 0,
    staleTime: Infinity,
    cacheTime: Infinity,
    networkMode: "online",
  });

  return syncQuery;
};

export default sync;
