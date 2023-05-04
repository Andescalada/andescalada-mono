import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import useOfflineMode from "@hooks/useOfflineMode";
import { inferProcedureOutput } from "@trpc/server";
import storage, { Storage } from "@utils/mmkv/storage";
import offlineDb from "@utils/quick-sqlite";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import * as Sentry from "sentry-expo";
import { parse, stringify } from "superjson";

type ListToDownload = inferProcedureOutput<
  AppRouter["user"]["getDownloadedAssets"]
>;

export const useDownloadOfflineAssetsList = () => {
  trpc.user.getDownloadedAssets.useQuery(undefined, {
    onSuccess: async (data) => {
      storage.set(Storage.DOWNLOADED_ASSETS, stringify(data.assetsToDownload));
    },
  });
};

export const useHydrateOfflineAssets = () => {
  const { isOfflineMode } = useOfflineMode();

  const utils = trpc.useContext();

  const hydrate = useCallback(() => {
    const res = storage.getString(Storage.DOWNLOADED_ASSETS);
    if (!res) return;
    const downloadedList = parse<ListToDownload["assetsToDownload"]>(res);
    downloadedList.forEach((asset) => {
      const { params, router, procedure, zoneId } = asset;

      // @ts-expect-error Unable to type procedure
      const selectedUtil = utils[router][procedure];

      const db = offlineDb.open();
      const savedData = offlineDb.get(
        db,
        stringify({ router, procedure, params }),
        zoneId,
      );

      if (!savedData) return;

      selectedUtil.setData(params, savedData.data);
      db.close();
    });
  }, [utils]);

  const shouldHydrate = useCallback(
    async (status: AppStateStatus) => {
      if (!(status === "active")) return;
      if (isOfflineMode) {
        Sentry.Native.captureMessage("hydrate offline assets");

        hydrate();
      }
    },
    [isOfflineMode, hydrate],
  );

  useEffect(() => {
    Sentry.Native.captureMessage("use Effect hydrate offline assets");
    const subscription = AppState.addEventListener("change", (status) =>
      shouldHydrate(status),
    );

    return () => subscription.remove();
  }, [shouldHydrate]);
};
