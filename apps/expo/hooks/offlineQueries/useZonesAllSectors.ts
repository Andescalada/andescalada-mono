import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { isOfflineModeAtom } from "@atoms/index";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferProcedureOutput, inferRouterInputs } from "@trpc/server";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { stringify } from "superjson";

type Data = inferProcedureOutput<AppRouter["zones"]["allSectors"]>;

type Params = inferRouterInputs<AppRouter>["zones"]["allSectors"];

type Options =
  inferReactQueryProcedureOptions<AppRouter>["zones"]["allSectors"];

const useZonesAllSectors = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];

  return trpc.zones.allSectors.useQuery(params, {
    enabled: !isOfflineMode,
    onSuccess: (data) => {
      if (data.isDownloaded) {
        const db = offlineDb.open();
        offlineDb.set(
          db,
          stringify({
            router: "zones",
            procedure: "allSectors",
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
};

export default useZonesAllSectors;
