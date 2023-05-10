import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { downloadedZonesAtom, isOfflineModeAtom } from "@atoms/index";
import { useQuery } from "@tanstack/react-query";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferProcedureOutput, inferRouterInputs } from "@trpc/server";
import getOfflineData from "@utils/getOfflineData";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { stringify } from "superjson";

type Data = inferProcedureOutput<AppRouter["walls"]["byId"]>;

type Params = inferRouterInputs<AppRouter>["walls"]["byId"];

type Options = inferReactQueryProcedureOptions<AppRouter>["walls"]["byId"];

const path = { router: "walls", procedure: "byId" };

const useWallsById = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];
  const downloadedZones = useAtom(downloadedZonesAtom)[0];

  const offlineStates = useQuery({
    queryKey: [
      "offlineData",
      stringify({
        ...path,
        params,
      }),
      params,
    ] as const,
    queryFn: ({ queryKey }) => getOfflineData<Params, Data>(...queryKey),
    enabled: isOfflineMode,
  });

  const onlineResults = trpc.walls.byId.useQuery(params, {
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

export default useWallsById;
