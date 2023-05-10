import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { isOfflineModeAtom } from "@atoms/index";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferProcedureOutput, inferRouterInputs } from "@trpc/server";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { stringify } from "superjson";

type Data = inferProcedureOutput<AppRouter["topos"]["byId"]>;

type Params = inferRouterInputs<AppRouter>["topos"]["byId"];

type Options = inferReactQueryProcedureOptions<AppRouter>["topos"]["byId"];

const useToposById = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];

  return trpc.topos.byId.useQuery(params, {
    ...options,
    enabled: !isOfflineMode,
    initialData: () => {
      const db = offlineDb.open();
      const saved = offlineDb.get<Data>(
        db,
        stringify({
          router: "topos",
          procedure: "byId",
          params,
        }),
        params.zoneId,
      );

      return saved?.data;
    },
  });
};

export default useToposById;
