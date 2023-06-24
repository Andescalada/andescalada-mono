import { columns } from "@andescalada/utils/local-database";
import { Keys, LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { RouteEvaluation } from "@local-database/model";
import { Table } from "@local-database/model/schema";
import { Q } from "@nozbe/watermelondb";
import { useQuery } from "@tanstack/react-query";

type Arg = { routeId: string };

const getRouteEvaluation = async ({ routeId }: Arg) => {
  const res = await database.read(async () => {
    const res = await database
      .get<RouteEvaluation>(Table.ROUTE_EVALUATION)
      .query(
        Q.where(columns.RouteEvaluation.routeId, routeId),
        Q.sortBy(columns.RouteEvaluation.createdAt, "desc"),
        Q.take(1),
      )
      .fetch();

    if (res[0]) {
      const { evaluation, id, routeId, userId } = res[0];

      return { evaluation, id, routeId, userId };
    }
    return null;
  });
  return res;
};

const useGetRouteEvaluationQuery = ({ routeId }: Arg) => {
  const res = useQuery(
    [LOCAL_DATABASE, Keys.GetRouteEvaluation, routeId],
    () => getRouteEvaluation({ routeId }),
    {
      networkMode: "always",
      retry: 0,
    },
  );

  return res;
};

export default useGetRouteEvaluationQuery;
