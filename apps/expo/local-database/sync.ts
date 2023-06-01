import { database } from "@local-database/index";
import { synchronize } from "@nozbe/watermelondb/sync";
import client from "@utils/trpc/client";

const sync = async () => {
  await synchronize({
    database,
    pullChanges: async ({ migration, schemaVersion, lastPulledAt }) => {
      const res = await client.sync.pull.query({
        migration,
        schemaVersion,
        lastPulledAt: lastPulledAt ? new Date(lastPulledAt) : new Date(),
      });

      return res;
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      await client.sync.push.mutate({
        changes,
        lastPulledAt: new Date(lastPulledAt),
      });
    },
    migrationsEnabledAtVersion: 3,
  });
};

export default sync;
