import { trpc } from "@andescalada/utils/trpc";
import { DownloadedAssetsList } from "@atoms/index";
import useIsConnected from "@hooks/useIsConnected";
import useSetAssetsToDb from "@hooks/useSetAssetsToDb";
import { getItem, Storage } from "@utils/mmkv/storage";
import { useEffect } from "react";

const useSyncDownloadedZones = async () => {
  const { saveAssetsToDb } = useSetAssetsToDb();

  const { mutateAsync } = trpc.user.updateDownloadedAssets.useMutation();

  const isConnected = useIsConnected();

  const updateDownloadedZones = async () => {
    const downloadedAssetsListToParse = getItem<string>(
      Storage.DOWNLOADED_ASSETS,
    );

    if (!downloadedAssetsListToParse) return;

    const downloadedAssetsList: DownloadedAssetsList = JSON.parse(
      downloadedAssetsListToParse,
    );

    const zones = Object.entries(downloadedAssetsList).map(
      ([zoneId, data]) => ({
        zoneId,
        assets: data.assets.map(({ assetId, zoneId, version }) => ({
          assetId,
          zoneId,
          version,
        })),
      }),
    );

    const data = await mutateAsync({ zones });

    if (!data || !isConnected) return;
    for (const zone of data) {
      await saveAssetsToDb(zone);
    }
  };

  useEffect(() => {
    updateDownloadedZones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useSyncDownloadedZones;
