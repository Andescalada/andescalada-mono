import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { downloadedZonesAtom, isOfflineModeAtom } from "@atoms/index";
import { useQuery } from "@tanstack/react-query";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferProcedureOutput, inferRouterInputs } from "@trpc/server";
import constants from "@utils/constants";
import getOfflineData from "@utils/getOfflineData";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";

type Data = inferProcedureOutput<AppRouter["zones"]["allSectors"]>;

type Params = inferRouterInputs<AppRouter>["zones"]["allSectors"];

type Options =
  inferReactQueryProcedureOptions<AppRouter>["zones"]["allSectors"];

const path = { router: "zones", procedure: "allSectors" };

const useZonesAllSectors = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];
  const downloadedZones = useAtom(downloadedZonesAtom)[0];

  const assetId = `${path.router}.${path.procedure}/${params.zoneId}`;

  const offlineStates = useQuery({
    enabled: isOfflineMode,
    queryKey: [constants.offlineData, assetId, params] as const,
    queryFn: ({ queryKey }) => getOfflineData<Params, Data>(...queryKey),
  });

  const onlineResults = trpc.zones.allSectors.useQuery(params, {
    enabled: !isOfflineMode,
    onSuccess: (data) => {
      if (!!downloadedZones[params.zoneId]) {
        const db = offlineDb.open();
        offlineDb.set(db, assetId, params.zoneId, data, data.version);
      }
    },
    ...options,
  });

  return isOfflineMode ? offlineStates : onlineResults;
};

export default useZonesAllSectors;
