import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId";
import { randomUUID } from "expo-crypto";

import modelClasses from "./model";
import migrations from "./model/migrations";
import schema from "./model/schema";
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "userAssets",
  jsi: true,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

setGenerator(randomUUID);

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses,
});
