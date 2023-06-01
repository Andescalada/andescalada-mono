import { database } from "@local-database/index";
import { User } from "@local-database/model";
import { schema, Tables } from "@local-database/model/schema";
import { Q } from "@nozbe/watermelondb";
import { useQuery } from "@tanstack/react-query";

const getOwnUser = async () => {
  const res = await database.read(async () => {
    const res = await database
      .get<User>(Tables.USERS)
      .query(Q.where(schema[Tables.USERS].ownUser.name, true))
      .fetch();

    return res[0] || null;
  });
  return res;
};

const useGetOwnUserQuery = () => {
  const res = useQuery(["local-database", "ownUser"], getOwnUser, { retry: 0 });

  return res;
};

export default useGetOwnUserQuery;
