import { columns, Table } from "@andescalada/utils/local-database";
import { Keys, LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { User } from "@local-database/model";
import { Q } from "@nozbe/watermelondb";
import { useQuery } from "@tanstack/react-query";

const getGradeSystems = () => {
  return database.read(async () => {
    const userResponse = await database
      .get<User>(Table.USER)
      .query(
        Q.where(columns.User.ownUser, true),
        Q.sortBy(columns.User.createdAt, "desc"),
        Q.take(1),
      )
      .fetch();

    const user = userResponse.at(0);
    if (!user) throw new Error("No own user found in local db");
    const { preferredBoulderGrade, preferredSportGrade, preferredTradGrade } =
      user;
    return { preferredBoulderGrade, preferredSportGrade, preferredTradGrade };
  });
};

const useGetGradeSystemsQuery = () => {
  const res = useQuery(
    [LOCAL_DATABASE, Keys.GetGradeSystems],
    getGradeSystems,
    {
      networkMode: "always",
      retry: 0,
    },
  );

  return res;
};

export default useGetGradeSystemsQuery;
