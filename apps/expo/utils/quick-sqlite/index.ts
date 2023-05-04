import {
  open as openDb,
  QuickSQLiteConnection,
} from "react-native-quick-sqlite";
import { parse, stringify } from "superjson";

const open = () => openDb({ name: "offlineAssets.db", location: "default" });

const createZoneTable = async (zoneId: string) => {
  const db = open();

  const query = `CREATE TABLE IF NOT EXISTS '${zoneId}'(
        assetId TEXT NOT NULL PRIMARY KEY,
        data TEXT,
        version INTEGER
    );`;

  const res = await db.executeAsync(query);

  return res;
};

const get = <Return>(
  db: QuickSQLiteConnection,
  assetId: string,
  zoneId: string,
): { data: Return; version: number } | undefined => {
  const query = `SELECT data, version FROM '${zoneId}' WHERE assetId = '${assetId}' LIMIT 1`;

  let results;
  try {
    const { rows } = db.execute(query);

    const result = rows?._array[0] as {
      data: string;
      version: number;
    };

    const data = parse<Return>(result.data);
    const version = result.version;

    results = { data, version };
  } catch {
    results = undefined;
  }
  // db.close();
  return results;
};

const set = async (
  db: QuickSQLiteConnection,
  assetId: string,
  zoneId: string,
  data: unknown,
  version: number,
) => {
  const serializedData = stringify(data);

  const query = `INSERT OR REPLACE INTO '${zoneId}' (assetId, data, version) VALUES ('${assetId}', '${serializedData}', ${version})`;

  await db.executeAsync(query);

  return serializedData;
};

const setOrCreate = async (
  db: QuickSQLiteConnection,
  assetId: string,
  zoneId: string,
  data: unknown,
  version: number,
) => {
  await createZoneTable(zoneId);
  return await set(db, assetId, zoneId, data, version);
};

const deleteAsset = async (
  db: QuickSQLiteConnection,
  assetId: string,
  zoneId: string,
) => {
  const query = `DELETE FROM ? WHERE assetId = ?`;

  const res = await db.executeAsync(query, [`${zoneId}`, `${assetId}`]);
  // db.close();
  return res;
};

const deleteZone = async (db: QuickSQLiteConnection, zoneId: string) => {
  const query = `DROP TABLE '${zoneId}';`;
  const res = await db.executeAsync(query);

  return res;
};

const allSavedZones = (db: QuickSQLiteConnection) => {
  const query = `SELECT 
      name
    FROM 
      sqlite_schema
    WHERE 
      type ='table' AND 
      name NOT LIKE 'sqlite_%';`;

  const res = db.execute(query);
  // db.close();
  return res.rows?._array as string[];
};

const allAssetsOfZone = (db: QuickSQLiteConnection, zoneId: string) => {
  const query = `SELECT assetId, version FROM '${zoneId}'`;

  const res = db.execute(query);
  // db.close();
  return res.rows?._array as { assetId: string; version: number }[];
};

const offlineDb = {
  open,
  get,
  set,
  delete: deleteAsset,
  deleteZone,
  setOrCreate,
  allSavedZones,
  allAssetsOfZone,
};

export default offlineDb;
