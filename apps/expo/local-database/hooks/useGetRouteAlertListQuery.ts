import { columns } from "@andescalada/utils/local-database";
import { Keys, LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { RouteAlert } from "@local-database/model";
import { Table } from "@local-database/model/schema";
import { Q } from "@nozbe/watermelondb";
import { useQuery } from "@tanstack/react-query";

type Arg = { routeId: string } | { zoneId: string };

const getRouteAlertsByRoute = async ({
  routeId,
}: {
  routeId: string | undefined;
}) => {
  if (!routeId) throw new Error("routeId is required");
  const res = await database.read(() => {
    return database
      .get<RouteAlert>(Table.ROUTE_ALERT)
      .query(
        Q.where(columns.RouteAlert.routeId, routeId),
        Q.sortBy(columns.RouteAlert.createdAt, "desc"),
      )
      .fetch();
  });
  return res;
};

const getRouteAlertsByZone = async ({
  zoneId,
}: {
  zoneId: string | undefined;
}) => {
  if (!zoneId) throw new Error("zoneId is required");
  const res = await database.read(() => {
    return database
      .get<RouteAlert>(Table.ROUTE_ALERT)
      .query(
        Q.where(columns.RouteAlert.zoneId, zoneId),
        Q.sortBy(columns.RouteAlert.createdAt, "desc"),
      )
      .fetch();
  });
  return res;
};

const useGetRouteAlertListQuery = (args: Arg) => {
  const routeId = "routeId" in args ? args.routeId : undefined;
  const zoneId = "zoneId" in args ? args.zoneId : undefined;

  const routeRes = useQuery(
    [LOCAL_DATABASE, Keys.GetRouteAlertList, routeId],
    () => getRouteAlertsByRoute({ routeId }),
    {
      networkMode: "always",
      retry: 0,
      enabled: !!routeId,
    },
  );

  const zoneRes = useQuery(
    [LOCAL_DATABASE, Keys.GetRouteAlertList, zoneId],
    () => getRouteAlertsByZone({ zoneId }),
    {
      networkMode: "always",
      retry: 0,
      enabled: !!zoneId,
    },
  );

  return zoneId ? zoneRes : routeRes;
};

export default useGetRouteAlertListQuery;
