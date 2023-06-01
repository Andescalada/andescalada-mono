import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId";
import { randomUUID } from "expo-crypto";
import * as Sentry from "sentry-expo";

import modelClasses from "./model";
import migrations from "./model/migrations";
import schema from "./model/schema";

const adapter = new SQLiteAdapter({
  schema,
  // migrations,
  dbName: "userAssets",
  jsi: true,
  onSetUpError: (error) => {
    Sentry.Native.captureException(error);
  },
});

setGenerator(randomUUID);

export const database = new Database({
  adapter,
  modelClasses,
});
