import offlineDb from "@utils/quick-sqlite";

const getOfflineData = async <P, R>(
  key: "offlineData",
  assetId: string,
  params: P extends { zoneId: string } ? P : P & { zoneId: string },
): Promise<R | undefined> => {
  const db = offlineDb.open();
  const saved = await offlineDb.getAsync<R>(db, assetId, params.zoneId);
  return saved?.data;
};

export default getOfflineData;
