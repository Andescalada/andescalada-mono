import { columns, Table } from "@andescalada/utils/local-database";
import { LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { RouteEvaluation } from "@local-database/model";
import { Q } from "@nozbe/watermelondb";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const setOrCreateRouteEvaluation = async (input: {
  id?: string;
  evaluation: number;
  routeId: string;
  userId: string;
}) => {
  await database.write(async () => {
    try {
      const routeEvaluation = await database
        .get<RouteEvaluation>(Table.ROUTE_EVALUATION)
        .query(
          Q.where(columns.RouteEvaluation.routeId, input.routeId),
          Q.sortBy(columns.RouteEvaluation.createdAt, "desc"),
          Q.take(1),
        )
        .then((results) => results.at(0) || null);

      if (routeEvaluation) {
        return await routeEvaluation.update((routeEvaluation) => {
          if (input.id) routeEvaluation._raw.id = input.id;
          routeEvaluation.evaluation = input.evaluation;
          routeEvaluation.routeId = input.routeId;
          routeEvaluation.userId = input.userId;
        });
      }
      return await database
        .get<RouteEvaluation>(Table.ROUTE_EVALUATION)
        .create((routeEvaluation) => {
          if (input.id) routeEvaluation._raw.id = input.id;
          routeEvaluation.evaluation = input.evaluation;
          routeEvaluation.routeId = input.routeId;
          routeEvaluation.userId = input.userId;
        });
    } catch (error) {
      console.error("ERROR IN SET OR CREATE ROUTE EVALUATION", error);
    }
  });
  return true;
};

const useSetOrCreateRouteEvaluationMutation = () => {
  const queryClient = useQueryClient();

  const m = useMutation(setOrCreateRouteEvaluation, {
    networkMode: "always",

    onSuccess: () => {
      queryClient.invalidateQueries([LOCAL_DATABASE]);
    },
  });

  return m;
};

export default useSetOrCreateRouteEvaluationMutation;
