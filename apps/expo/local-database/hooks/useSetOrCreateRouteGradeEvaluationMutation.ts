import { GradeSystemsSchema } from "@andescalada/db/zod";
import { columns, Table } from "@andescalada/utils/local-database";
import { LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { RouteGradeEvaluation } from "@local-database/model";
import { Q } from "@nozbe/watermelondb";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const setOrCreateRouteGradeEvaluation = (input: {
  id?: string;
  evaluation: number;
  originalGradeSystem: typeof GradeSystemsSchema._type;
  originalGrade: string;
  routeId: string;
  userId: string;
}) => {
  return database.write(async () => {
    try {
      const routeGradeEvaluation = await database
        .get<RouteGradeEvaluation>(Table.ROUTE_GRADE_EVALUATION)
        .query(
          Q.where(columns.RouteGradeEvaluation.routeId, input.routeId),
          Q.sortBy(columns.RouteGradeEvaluation.createdAt, "desc"),
          Q.take(1),
        )
        .then((results) => results.at(0) || null);

      if (routeGradeEvaluation) {
        return routeGradeEvaluation.update((routeGradeEvaluation) => {
          if (input.id) routeGradeEvaluation._raw.id = input.id;
          routeGradeEvaluation.evaluation = input.evaluation;
          routeGradeEvaluation.routeId = input.routeId;
          routeGradeEvaluation.userId = input.userId;
          routeGradeEvaluation.originalGradeSystem = input.originalGradeSystem;
          routeGradeEvaluation.originalGrade = input.originalGrade;
        });
      }
      return database
        .get<RouteGradeEvaluation>(Table.ROUTE_GRADE_EVALUATION)
        .create((routeGradeEvaluation) => {
          if (input.id) routeGradeEvaluation._raw.id = input.id;
          routeGradeEvaluation.evaluation = input.evaluation;
          routeGradeEvaluation.originalGradeSystem = input.originalGradeSystem;
          routeGradeEvaluation.originalGrade = input.originalGrade;
          routeGradeEvaluation.routeId = input.routeId;
          routeGradeEvaluation.userId = input.userId;
        });
    } catch (error) {
      console.error("ERROR IN SET OR CREATE ROUTE GRADE EVALUATION", error);
    }
  });
};

type Options = {
  onSuccess?: (
    result: Awaited<ReturnType<typeof setOrCreateRouteGradeEvaluation>>,
    params: Parameters<typeof setOrCreateRouteGradeEvaluation>[number],
  ) => void;
};

const useSetOrCreateRouteGradeEvaluationMutation = (options?: Options) => {
  const queryClient = useQueryClient();

  const m = useMutation(setOrCreateRouteGradeEvaluation, {
    networkMode: "always",
    onSuccess: (data, params) => {
      queryClient.invalidateQueries([LOCAL_DATABASE]);
      options?.onSuccess?.(data, params);
    },
  });

  return m;
};

export default useSetOrCreateRouteGradeEvaluationMutation;
