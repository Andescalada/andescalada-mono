import {
  open as openDb,
  QuickSQLiteConnection,
} from "react-native-quick-sqlite";
import { parse, stringify } from "superjson";

const open = () => openDb({ name: "offlineAssets.db", location: "default" });

const createZoneTable = async (db: QuickSQLiteConnection, zoneId: string) => {
  const query = `CREATE TABLE IF NOT EXISTS '${zoneId}'(
        assetId TEXT NOT NULL PRIMARY KEY,
        data TEXT NOT NULL,
        version INTEGER
    );`;

  const res = await db.executeAsync(query);

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
    const { rows } = await db.executeAsync(query);

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
    const { rows } = db.execute(query);

    const result = rows?._array[0] as {
      data: string;
      version: number;
    };

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
  const serializedData = stringify(data);

  const query = `INSERT OR REPLACE INTO '${zoneId}' (assetId, data, version) VALUES ('${assetId}', '${serializedData}', ${version})`;

  await db.executeAsync(query);

  return serializedData;
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
    const query = `INSERT OR REPLACE INTO '${zoneId}' (assetId, data, version) VALUES ('${assetId}', '${serializedData}', ${version})`;
    db.execute(query);
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

  const res = await db.executeAsync(query, [`${zoneId}`, `${assetId}`]);

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

  return res.rows?._array as string[];
};

const allAssetsOfZone = (db: QuickSQLiteConnection, zoneId: string) => {
  const query = `SELECT assetId, version FROM '${zoneId}'`;

  const res = db.execute(query);

  return res.rows?._array as { assetId: string; version: number }[];
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
