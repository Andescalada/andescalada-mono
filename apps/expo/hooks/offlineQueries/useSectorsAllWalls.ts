import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { isOfflineModeAtom } from "@atoms/index";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferProcedureOutput, inferRouterInputs } from "@trpc/server";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { stringify } from "superjson";

type Data = inferProcedureOutput<AppRouter["sectors"]["allWalls"]>;

type Params = inferRouterInputs<AppRouter>["sectors"]["allWalls"];

type Options =
  inferReactQueryProcedureOptions<AppRouter>["sectors"]["allWalls"];

const useSectorsAllWalls = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];

  return trpc.sectors.allWalls.useQuery(params, {
    enabled: !isOfflineMode,
    initialData: () => {
      const db = offlineDb.open();
      const saved = offlineDb.get<Data>(
        db,
        stringify({
          router: "sectors",
          procedure: "allWalls",
          params,
        }),
        params.zoneId,
      );
      db.close();
      return saved?.data;
    },
    ...options,
  });
};

export default useSectorsAllWalls;
