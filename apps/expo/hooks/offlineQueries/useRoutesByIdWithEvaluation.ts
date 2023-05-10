import {
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
  trpc,
} from "@andescalada/utils/trpc";
import { downloadedZonesAtom, isOfflineModeAtom } from "@atoms/index";
import { useQuery } from "@tanstack/react-query";
import getOfflineData from "@utils/getOfflineData";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { stringify } from "superjson";

type Data = RouterOutputs["routes"]["byIdWithEvaluation"];

type Params = RouterInputs["routes"]["byIdWithEvaluation"];

type Options = ReactQueryOptions["routes"]["byIdWithEvaluation"];

const path = { router: "routes", procedure: "byIdWithEvaluation" };

const useRoutesByIdWithEvaluation = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];
  const downloadedZones = useAtom(downloadedZonesAtom)[0];

  const offlineStates = useQuery({
    enabled: isOfflineMode,
    cacheTime: 0,
    staleTime: 0,
    queryKey: [
      "offlineData",
      stringify({
        ...path,
        params,
      }),
      params,
    ] as const,
    queryFn: ({ queryKey }) => getOfflineData<Params, Data>(...queryKey),
  });

  const onlineResults = trpc.routes.byIdWithEvaluation.useQuery(params, {
    ...options,
    enabled: !isOfflineMode,
    onSuccess: (data) => {
      if (!!downloadedZones[params.zoneId]) {
        const db = offlineDb.open();
        offlineDb.set(
          db,
          stringify({
            ...path,
            params,
          }),
          params.zoneId,
          data,
          data.version,
        );
      }
    },
  });

  return isOfflineMode ? offlineStates : onlineResults;
};

export default useRoutesByIdWithEvaluation;
