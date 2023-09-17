import { columns } from "@andescalada/utils/local-database";
import { Keys, LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { RouteGradeEvaluation } from "@local-database/model";
import { Table } from "@local-database/model/schema";
import { Q } from "@nozbe/watermelondb";
import { useQuery } from "@tanstack/react-query";

type Arg = { routeId: string };

const getRouteAlerts = async ({ routeId }: Arg) => {
  const res = await database.read(() => {
    return database
      .get<RouteGradeEvaluation>(Table.ROUTE_ALERT)
      .query(
        Q.where(columns.RouteGradeEvaluation.routeId, routeId),
        Q.sortBy(columns.RouteGradeEvaluation.createdAt, "desc"),
      )
      .fetch();
  });
  return res;
};

const useGetRouteAlertsQuery = ({ routeId }: Arg) => {
  const res = useQuery(
    [LOCAL_DATABASE, Keys.GetRouteGradeEvaluation, routeId],
    () => getRouteAlerts({ routeId }),
    {
      networkMode: "always",
      retry: 0,
    },
  );

  return res;
};

export default useGetRouteAlertsQuery;
