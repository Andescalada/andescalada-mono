import { Table } from "@andescalada/utils/local-database";
import { LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { RouteAlert } from "@local-database/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteRouteAlert = async (input: { id: string }) => {
  const result = await database.write(async () => {
    try {
      const routeAlertToUpdate = await database
        .get<RouteAlert>(Table.ROUTE_ALERT)
        .find(input.id);

      if (!routeAlertToUpdate) throw new Error("Route alert not found");

      routeAlertToUpdate.markAsDeleted();
    } catch (error) {
      console.error("ERROR IN DELETE ROUTE ALERT", error);
    }
  });
  return result;
};

type Options = {
  onSuccess?: (
    result: Awaited<ReturnType<typeof deleteRouteAlert>>,
    params: Parameters<typeof deleteRouteAlert>[number],
  ) => void;
};

const useDeleteRouteAlertMutation = (options?: Options) => {
  const queryClient = useQueryClient();

  const m = useMutation(deleteRouteAlert, {
    networkMode: "always",
    onSuccess: (data, params) => {
      queryClient.invalidateQueries([LOCAL_DATABASE]);
      options?.onSuccess?.(data, params);
    },
  });

  return m;
};

export default useDeleteRouteAlertMutation;
