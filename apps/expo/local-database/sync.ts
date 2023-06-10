import { database } from "@local-database/index";
import { Table } from "@local-database/model/schema";
import { synchronize } from "@nozbe/watermelondb/sync";
import client from "@utils/trpc/client";

const sync = async () => {
  await synchronize({
    database,
    pullChanges: ({ lastPulledAt }) =>
      client.sync.pull.query({
        lastPulledAt: new Date(lastPulledAt ?? 0),
        tables: Object.values(Table).filter((table) => table !== Table.USER),
      }),
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.info("IS PUSHING");
      await client.sync.push.mutate({
        changes,
        lastPulledAt: new Date(lastPulledAt),
      });
    },
    // migrationsEnabledAtVersion: 1,
  });
};

export default sync;
