import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { isOfflineModeAtom } from "@atoms/index";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferProcedureOutput, inferRouterInputs } from "@trpc/server";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { stringify } from "superjson";

type Data = inferProcedureOutput<AppRouter["walls"]["byId"]>;

type Params = inferRouterInputs<AppRouter>["walls"]["byId"];

type Options = inferReactQueryProcedureOptions<AppRouter>["walls"]["byId"];

const useWallsById = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];

  return trpc.walls.byId.useQuery(params, {
    ...options,
    enabled: !isOfflineMode,
    initialData: () => {
      const db = offlineDb.open();
      const saved = offlineDb.get<Data>(
        db,
        stringify({
          router: "walls",
          procedure: "byId",
          params,
        }),
        params.zoneId,
      );
      db.close();
      console.log(
        stringify({
          router: "walls",
          procedure: "byId",
          params,
        }),
      );

      console.log({ saved: saved?.data });
      return saved?.data;
    },
    placeholderData: () => {
      const db = offlineDb.open();
      const saved = offlineDb.get<Data>(
        db,
        stringify({
          router: "walls",
          procedure: "byId",
          params,
        }),
        params.zoneId,
      );
      db.close();
      return saved?.data;
    },
  });
};

export default useWallsById;
