import { database } from "@local-database/index";
import { Table } from "@local-database/model/schema";
import { synchronize } from "@nozbe/watermelondb/sync";
import client from "@utils/trpc/client";

const sync = async () => {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      const res = await client.sync.pull.query({
        lastPulledAt: new Date(lastPulledAt ?? 0),
        tables: Object.values(Table).filter((table) => table !== Table.USER),
      });
      console.log("PULL", JSON.stringify(res, null, 2));
      return res;
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log("PUSH", JSON.stringify(changes, null, 2));
      await client.sync.push.mutate({
        changes,
        lastPulledAt: new Date(lastPulledAt),
      });
    },
    migrationsEnabledAtVersion: 1,
  });
};

export default sync;
