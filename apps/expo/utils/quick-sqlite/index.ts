import { open as openDb } from "react-native-quick-sqlite";
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
  db.close();
  return res;
};

const get = <Return>(
  assetId: string,
  zoneId: string,
): { data: Return; version: number } | undefined => {
  const db = open();
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
  db.close();
  return results;
};

const set = async (
  assetId: string,
  zoneId: string,
  data: unknown,
  version: number,
) => {
  const serializedData = stringify(data);

  const query = `INSERT OR REPLACE INTO '${zoneId}' (assetId, data, version) VALUES ('${assetId}', '${serializedData}', ${version})`;

  const db = open();
  await db.executeAsync(query);
  db.close();
  return serializedData;
};

const setOrCreate = async (
  assetId: string,
  zoneId: string,
  data: unknown,
  version: number,
) => {
  await createZoneTable(zoneId);
  return await set(assetId, zoneId, data, version);
};

const deleteAsset = async (assetId: string, zoneId: string) => {
  const db = open();
  const query = `DELETE FROM ? WHERE assetId = ?`;

  const res = await db.executeAsync(query, [`${zoneId}`, `${assetId}`]);
  db.close();
  return res;
};

const deleteZone = async (zoneId: string) => {
  const db = open();
  const query = `DROP TABLE '${zoneId}';`;
  const res = await db.executeAsync(query);
  db.close();
  return res;
};

const offlineDb = {
  open,
  get,
  set,
  delete: deleteAsset,
  deleteZone,
  setOrCreate,
};

export default offlineDb;
