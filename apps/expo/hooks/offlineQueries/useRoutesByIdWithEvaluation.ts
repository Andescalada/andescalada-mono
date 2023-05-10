import {
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
  trpc,
} from "@andescalada/utils/trpc";
import { isOfflineModeAtom } from "@atoms/index";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { useState } from "react";
import { stringify } from "superjson";

type Data = RouterOutputs["routes"]["byIdWithEvaluation"];

type Params = RouterInputs["routes"]["byIdWithEvaluation"];

type Options = ReactQueryOptions["routes"]["byIdWithEvaluation"];

const useRoutesByIdWithEvaluation = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];

  // 26fc77b5-8468-4767-a151-8edf45b25005

  const [iV] = useState(async () => {
    const db = offlineDb.open();
    const saved = await offlineDb.getAsync<Data>(
      db,
      stringify({
        router: "routes",
        procedure: "byIdWithEvaluation",
        params,
      }),
      params.zoneId,
    );

    return saved?.data;
  });

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

      return saved?.data;
    },
  });
};

export default useRoutesByIdWithEvaluation;
