import getOfflineAssets from "utils/getOfflineAssets";
import { protectedZoneProcedure } from "utils/protectedZoneProcedure";

const offlineAssets = protectedZoneProcedure.query(async ({ ctx, input }) => {
  return getOfflineAssets({
    ctx,
    input,
  });
});

export default offlineAssets;
