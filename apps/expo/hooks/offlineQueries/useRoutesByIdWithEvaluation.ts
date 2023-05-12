import {
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
  trpc,
} from "@andescalada/utils/trpc";
import { downloadedZonesAtom, isOfflineModeAtom } from "@atoms/index";
import { useQuery } from "@tanstack/react-query";
import constants from "@utils/constants";
import getOfflineData from "@utils/getOfflineData";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";

type Data = RouterOutputs["routes"]["byIdWithEvaluation"];

type Params = RouterInputs["routes"]["byIdWithEvaluation"];

type Options = ReactQueryOptions["routes"]["byIdWithEvaluation"];

const path = { router: "routes", procedure: "byIdWithEvaluation" };

const useRoutesByIdWithEvaluation = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];
  const downloadedZones = useAtom(downloadedZonesAtom)[0];

  const assetId = `${path.router}.${path.procedure}/${params.routeId}`;

  const offlineStates = useQuery({
    networkMode: "always",
    enabled: isOfflineMode,
    queryKey: [constants.offlineData, assetId, params] as const,
    queryFn: ({ queryKey }) => getOfflineData<Params, Data>(...queryKey),
  });

  const onlineStates = trpc.routes.byIdWithEvaluation.useQuery(params, {
    enabled: !isOfflineMode,
    onSuccess: (data) => {
      if (!!downloadedZones[params.zoneId]) {
        const db = offlineDb.open();
        offlineDb.set(db, assetId, params.zoneId, data, data.version);
      }
    },
    ...options,
  });

  return isOfflineMode ? offlineStates : onlineStates;
};

export default useRoutesByIdWithEvaluation;
