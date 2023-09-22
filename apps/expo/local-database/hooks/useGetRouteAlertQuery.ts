import { columns } from "@andescalada/utils/local-database";
import { Keys, LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { RouteAlert } from "@local-database/model";
import { Table } from "@local-database/model/schema";
import { Q } from "@nozbe/watermelondb";
import { useQuery } from "@tanstack/react-query";

type Arg = { id: string };

const getRouteAlert = async ({ id }: { id: string | undefined }) => {
  if (!id) throw new Error("id is required");
  const res = await database.read(() => {
    return database
      .get<RouteAlert>(Table.ROUTE_ALERT)
      .query(Q.where("id", id), Q.sortBy(columns.RouteAlert.createdAt, "desc"))
      .fetch();
  });

  return res.at(0) ?? null;
};

const useGetRouteAlertQuery = ({ id }: Arg) => {
  const res = useQuery(
    [LOCAL_DATABASE, Keys.GetRouteAlert, id],
    () => getRouteAlert({ id }),
    {
      staleTime: 0,
      networkMode: "always",
      retry: 0,
      enabled: !!id,
    },
  );

  return res;
};

export default useGetRouteAlertQuery;
