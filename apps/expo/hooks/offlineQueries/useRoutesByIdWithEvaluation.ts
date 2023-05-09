import {
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
  trpc,
} from "@andescalada/utils/trpc";
import { isOfflineModeAtom } from "@atoms/index";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { stringify } from "superjson";

type Data = RouterOutputs["routes"]["byIdWithEvaluation"];

type Params = RouterInputs["routes"]["byIdWithEvaluation"];

type Options = ReactQueryOptions["routes"]["byIdWithEvaluation"];

const useRoutesByIdWithEvaluation = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];

  return trpc.routes.byIdWithEvaluation.useQuery(params, {
    ...options,
    enabled: !isOfflineMode,
    initialData: () => {
      const db = offlineDb.open();
      const saved = offlineDb.get<Data>(
        db,
        stringify({
          router: "routes",
          procedure: "byIdWithEvaluation",
          params,
        }),
        params.zoneId,
      );
      console.log("savedDatA", saved?.data);
      db.close();

      return saved?.data;
    },
    placeholderData: () => {
      const db = offlineDb.open();
      const saved = offlineDb.get<Data>(
        db,
        stringify({
          router: "routes",
          procedure: "byIdWithEvaluation",
          params,
        }),
        params.zoneId,
      );
      db.close();
      return saved?.data;
    },
  });
};

export default useRoutesByIdWithEvaluation;
