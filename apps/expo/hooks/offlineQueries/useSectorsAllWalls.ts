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
import { stringify } from "superjson";

type Data = inferProcedureOutput<AppRouter["sectors"]["allWalls"]>;

type Params = inferRouterInputs<AppRouter>["sectors"]["allWalls"];

type Options =
  inferReactQueryProcedureOptions<AppRouter>["sectors"]["allWalls"];

const path = { router: "sectors", procedure: "allWalls" };

const useSectorsAllWalls = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];
  const downloadedZones = useAtom(downloadedZonesAtom)[0];

  const offlineStates = useQuery({
    queryKey: [
      constants.offlineData,
      stringify({
        ...path,
        params,
      }),
      params,
    ] as const,
    queryFn: ({ queryKey }) => getOfflineData<Params, Data>(...queryKey),
    enabled: isOfflineMode,
  });

  const onlineResults = trpc.sectors.allWalls.useQuery(params, {
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
    ...options,
  });

  return isOfflineMode ? offlineStates : onlineResults;
};

export default useSectorsAllWalls;
