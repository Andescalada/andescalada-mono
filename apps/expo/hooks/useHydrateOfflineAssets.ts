import { trpc } from "@andescalada/utils/trpc";
import { downloadedAssetsListAtom, isOfflineModeAtom } from "@atoms/index";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { stringify } from "superjson";

export const useHydrateOfflineAssets = () => {
  const downloadedAssetsList = useAtom(downloadedAssetsListAtom)[0];

  const utils = trpc.useContext();

  const hydrate = useCallback(async () => {
    const db = offlineDb.open();

    downloadedAssetsList.forEach(async (asset) => {
      const { params, router, procedure, zoneId } = asset;
      // @ts-expect-error Unable to type procedure
      const selectedUtil = utils[router][procedure];
      const savedData = await offlineDb.getAsync(
        db,
        stringify({ router, procedure, params }),
        zoneId,
      );
      if (!savedData) return;
      selectedUtil.setData(params, savedData.data);
    });

    db.close();
  }, [downloadedAssetsList, utils]);

  return { hydrate };
};

export const useHydrateOfflineAssetsOnFocus = () => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];

  const { hydrate } = useHydrateOfflineAssets();

  const shouldHydrate = useCallback(
    async (status: AppStateStatus) => {
      if (!(status === "active")) return;
      if (isOfflineMode) {
        hydrate();
      }
    },
    [isOfflineMode, hydrate],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) =>
      shouldHydrate(status),
    );

    return () => subscription.remove();
  }, [shouldHydrate]);
};
