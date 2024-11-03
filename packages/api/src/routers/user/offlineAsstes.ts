import getOfflineAssets from "@andescalada/api/src/utils/getOfflineAssets";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

const offlineAssets = protectedZoneProcedure.query(async ({ ctx, input }) => {
  return getOfflineAssets({
    ctx,
    input,
  });
});

export default offlineAssets;
