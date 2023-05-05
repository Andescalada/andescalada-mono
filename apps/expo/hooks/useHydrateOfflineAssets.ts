import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import useOfflineMode from "@hooks/useOfflineMode";
import { inferProcedureOutput } from "@trpc/server";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import * as Sentry from "sentry-expo";
import { stringify } from "superjson";

type ListToDownload = inferProcedureOutput<
  AppRouter["user"]["offlineAssets"]
>["assetList"];

export const downloadedAssetsListAtom = atomWithMMKV<ListToDownload>(
  Storage.DOWNLOADED_ASSETS,
  [],
);

export const useHydrateOfflineAssets = () => {
  const downloadedAssetsList = useAtom(downloadedAssetsListAtom)[0];

  const utils = trpc.useContext();

  const hydrate = useCallback(async () => {
    const db = offlineDb.open();

    const hydrateAsset = downloadedAssetsList.map(async (asset) => {
      const { params, router, procedure, zoneId } = asset;

      // @ts-expect-error Unable to type procedure
      const selectedUtil = utils[router][procedure];

      const savedData = await offlineDb.get(
        db,
        stringify({ router, procedure, params }),
        zoneId,
      );
      if (!savedData) return;
      return selectedUtil.setData(params, savedData.data);
    });
    await Promise.all(hydrateAsset);
    Sentry.Native.captureMessage(`Hydrated assets: ${hydrateAsset.length}`);
    db.close();
  }, [downloadedAssetsList, utils]);

  return { hydrate };
};

export const useHydrateOfflineAssetsOnFocus = () => {
  const { isOfflineMode } = useOfflineMode();

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
