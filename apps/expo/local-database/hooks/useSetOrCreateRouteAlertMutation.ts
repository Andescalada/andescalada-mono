import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import { Table } from "@andescalada/utils/local-database";
import { LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { RouteAlert } from "@local-database/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const setOrCreateRouteEvaluation = async (input: {
  id?: string;
  routeId: string;
  zoneId: string;
  userId: string;
  title: string;
  routeName: string;
  sectorName: string;
  description?: string;
  dueDate?: Date;
  kind: typeof RouteAlertKindSchema._type;
  severity: typeof RouteAlertSeveritySchema._type;
}) => {
  const result = await database.write(async () => {
    try {
      if (input.id) {
        const routeAlertToUpdate = await database
          .get<RouteAlert>(Table.ROUTE_ALERT)
          .find(input.id);

        return await routeAlertToUpdate.update((routeAlert) => {
          if (input.id) routeAlert._raw.id = input.id;
          routeAlert.title = input.title.toString();
          routeAlert.description = input.description?.toString();
          routeAlert.kind = input.kind.toString();
          routeAlert.severity = input.severity.toString();
          routeAlert.dueDate = input.dueDate;
          routeAlert.routeId = input.routeId;
          routeAlert.zoneId = input.zoneId;
          routeAlert.userId = input.userId;
          routeAlert.routeName = input.routeName;
          routeAlert.sectorName = input.sectorName;
        });
      }
      return await database
        .get<RouteAlert>(Table.ROUTE_ALERT)
        .create((routeAlert) => {
          if (input.id) routeAlert._raw.id = input.id;
          routeAlert.title = input.title.toString();
          routeAlert.description = input.description?.toString();
          routeAlert.kind = input.kind.toString();
          routeAlert.severity = input.severity.toString();
          routeAlert.dueDate = input.dueDate;
          routeAlert.routeId = input.routeId;
          routeAlert.zoneId = input.zoneId;
          routeAlert.userId = input.userId;
          routeAlert.routeName = input.routeName;
          routeAlert.sectorName = input.sectorName;
        });
    } catch (error) {
      console.error("ERROR IN SET OR CREATE ROUTE ALERT", error);
    }
  });
  return result;
};

type Options = {
  onSuccess?: (
    result: Awaited<ReturnType<typeof setOrCreateRouteEvaluation>>,
    params: Parameters<typeof setOrCreateRouteEvaluation>[number],
  ) => void;
};

const useSetOrCreateRouteAlertMutation = (options?: Options) => {
  const queryClient = useQueryClient();

  const m = useMutation(setOrCreateRouteEvaluation, {
    networkMode: "always",
    onSuccess: (data, params) => {
      queryClient.invalidateQueries([LOCAL_DATABASE]);
      options?.onSuccess?.(data, params);
    },
  });

  return m;
};

export default useSetOrCreateRouteAlertMutation;
