import { open, QuickSQLiteConnection } from "react-native-quick-sqlite";
import { deserialize, serialize } from "superjson";

let db: QuickSQLiteConnection;

const init = async () => {
  open({ name: "offlineAssets.db", location: "default" });
};

const closeDb = async () => {
  db.close();
};

const createZoneTable = async (zoneId: string) => {
  const db = open({ name: "offlineDatabase", location: "default" });

  const query = `CREATE TABLE IF NOT EXISTS ?(
        assetId TEXT NOT NULL PRIMARY KEY,
        data TEXT,
        version INTEGER
    );`;

  await db.executeAsync(query, [zoneId]);
};

const get = <Return>(assetId: string, zoneId: string): Return => {
  const query = `SELECT data, version FROM ? WHERE assetId = ?`;

  const { rows } = db.execute(query, [`${zoneId}`, `${assetId}`]);
  if (!rows) throw new Error(`No asset found for ${assetId} in ${zoneId}`);

  const value = deserialize<Return>(rows._array[0]);

  return value;
};

const set = async (
  assetId: string,
  zoneId: string,
  data: unknown,
  version: number,
) => {
  const query = `INSERT OR REPLACE INTO ? (assetId, data, version) VALUES (?, ?, ?)`;

  const serializedData = serialize(data);

  await createZoneTable(zoneId);

  await db.executeAsync(query, [
    `${zoneId}`,
    `${assetId}`,
    `${serializedData}`,
    version,
  ]);

  return serializedData;
};

const deleteAsset = async (assetId: string, zoneId: string) => {
  const query = `DELETE FROM ? WHERE assetId = ?`;

  await db.executeAsync(query, [`${zoneId}`, `${assetId}`]);
};

const deleteZone = async (zoneId: string) => {
  const query = `DROP TABLE ?`;
  await db.executeAsync(query, [`${zoneId}`]);
};

const offlineDb = {
  init,
  get,
  set,
  delete: deleteAsset,
  deleteZone,
  close: closeDb,
};

export default offlineDb;
