import { columns } from "@andescalada/utils/local-database";
import { Keys, LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { RouteGradeEvaluation } from "@local-database/model";
import { Table } from "@local-database/model/schema";
import { Q } from "@nozbe/watermelondb";
import { useQuery } from "@tanstack/react-query";

type Arg = { routeId: string };

const getRouteGradeEvaluation = async ({ routeId }: Arg) => {
  const res = await database.read(async () => {
    const res = await database
      .get<RouteGradeEvaluation>(Table.ROUTE_GRADE_EVALUATION)
      .query(
        Q.where(columns.RouteGradeEvaluation.routeId, routeId),
        Q.sortBy(columns.RouteGradeEvaluation.createdAt, "desc"),
        Q.take(1),
      )
      .fetch();

    if (res[0]) {
      const {
        evaluation,
        id,
        routeId,
        userId,
        originalGrade,
        originalGradeSystem,
      } = res[0];

      return {
        evaluation,
        id,
        routeId,
        userId,
        originalGrade,
        originalGradeSystem,
      };
    }
    return null;
  });
  return res;
};

const useGetRouteGradeEvaluationQuery = ({ routeId }: Arg) => {
  const res = useQuery(
    [LOCAL_DATABASE, Keys.GetRouteGradeEvaluation, routeId],
    () => getRouteGradeEvaluation({ routeId }),
    {
      networkMode: "always",
      retry: 0,
    },
  );

  return res;
};

export default useGetRouteGradeEvaluationQuery;
