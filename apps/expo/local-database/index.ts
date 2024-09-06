import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId";
import * as Sentry from "@sentry/react-native";
import { randomUUID } from "expo-crypto";

import modelClasses from "./model";
import migrations from "./model/migrations";
import schema from "./model/schema";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "userAssets",
  jsi: true,
  onSetUpError: (error) => {
    Sentry.captureException(error);
  },
});

setGenerator(randomUUID);

export const database = new Database({
  adapter,
  modelClasses,
});
