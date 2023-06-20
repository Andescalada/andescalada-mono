import getOfflineAssets from "@andescalada/api/src/utils/getOfflineAssets";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

const offlineAssets = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const { assets, imagesToDownload, assetList } = await getOfflineAssets({
    ctx,
    input,
  });

  return { assets, imagesToDownload, assetList };
});

export default offlineAssets;
