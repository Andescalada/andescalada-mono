import {
  type SQLiteDatabase as QuickSQLiteConnection,
  openDatabaseSync as openDb,
} from "expo-sqlite";
import { parse, stringify } from "superjson";

const open = () => openDb("offlineAssets.db");

const createZoneTable = async (db: QuickSQLiteConnection, zoneId: string) => {
  const query = `CREATE TABLE IF NOT EXISTS '${zoneId}' (
        assetId TEXT NOT NULL PRIMARY KEY,
        data JSON NOT NULL,
        version INTEGER
    );`;

  const res = await db.runAsync(query);

  return res;
};

const getAsync = async <Return>(
  db: QuickSQLiteConnection,
  assetId: string,
  zoneId: string,
): Promise<{ data: Return; version: number } | undefined> => {
  const query = `SELECT data, version FROM '${zoneId}' WHERE assetId = '${assetId}' LIMIT 1`;

  let results;
  try {
    const result = await db.getFirstAsync<{
      data: string;
      version: number;
    }>(query);

    if (!result) throw new Error("no result found in getAsync");

    const data = parse<Return>(result.data);
    const version = result.version;

    results = { data, version };
  } catch {
    results = undefined;
  }

  return results;
};

const get = <Return>(
  db: QuickSQLiteConnection,
  assetId: string,
  zoneId: string,
): { data: Return; version: number } | undefined => {
  const query = `SELECT data, version FROM '${zoneId}' WHERE assetId = '${assetId}' LIMIT 1`;

  let results;
  try {
    const result = db.getFirstSync<{
      data: string;
      version: number;
    }>(query);

    if (!result) throw new Error("no result found in get");

    const data = parse<Return>(result.data);
    const version = result.version;

    results = { data, version };
  } catch (err) {
    results = undefined;
  }

  return results;
};

const setAsync = async (
  db: QuickSQLiteConnection,
  assetId: string,
  zoneId: string,
  data: unknown,
  version: number,
) => {
  try {
    const serializedData = stringify(data);

    const query = `INSERT OR REPLACE INTO '${zoneId}' (assetId, data, version) VALUES (?,?,?)`;

    await db.runAsync(query, [`${assetId}`, `${serializedData}`, version]);

    return serializedData;
  } catch (err) {
    console.error(err);
    throw new Error(`${(err as any).message} - ${assetId}`);
  }
};

const set = (
  db: QuickSQLiteConnection,
  assetId: string,
  zoneId: string,
  data: unknown,
  version: number,
) => {
  try {
    const serializedData = stringify(data);
    const query = `INSERT OR REPLACE INTO '${zoneId}' (assetId, data, version) VALUES (?,?,?)`;
    db.runSync(query, [`${assetId}`, `${serializedData}`, version]);
    return serializedData;
  } catch {
    return undefined;
  }
};

const deleteAsset = async (
  db: QuickSQLiteConnection,
  assetId: string,
  zoneId: string,
) => {
  const query = `DELETE FROM ? WHERE assetId = ?`;

  const res = await db.runAsync(query, [`${zoneId}`, `${assetId}`]);

  return res;
};

const deleteZone = async (db: QuickSQLiteConnection, zoneId: string) => {
  const query = `DROP TABLE '${zoneId}';`;
  const res = await db.runAsync(query);

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

  const res = db.getAllSync<string[]>(query);

  return res;
};

const allAssetsOfZone = async (db: QuickSQLiteConnection, zoneId: string) => {
  try {
    const query = `SELECT assetId, version FROM '${zoneId}'`;

    const res = await db.getAllAsync<{ assetId: string; version: number }[]>(
      query,
    );

    return res;
  } catch (err) {
    return [];
  }
};

const offlineDb = {
  open,
  getAsync,
  get,
  setAsync,
  set,
  delete: deleteAsset,
  deleteZone,
  allSavedZones,
  allAssetsOfZone,
  createZoneTable,
};

export default offlineDb;
