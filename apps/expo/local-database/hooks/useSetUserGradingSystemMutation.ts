import { GradeSystemsSchema } from "@andescalada/db/zod";
import { columns } from "@andescalada/utils/local-database";
import { LOCAL_DATABASE } from "@local-database/hooks/types";
import { database } from "@local-database/index";
import { User } from "@local-database/model";
import { Table } from "@local-database/model/schema";
import { Q } from "@nozbe/watermelondb";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const setUserGradingSystems = async (input: {
  preferredSportGrade: typeof GradeSystemsSchema._type;
  preferredTradGrade: typeof GradeSystemsSchema._type;
  preferredBoulderGrade: typeof GradeSystemsSchema._type;
}) => {
  await database.write(async () => {
    try {
      const userResponse = await database
        .get<User>(Table.USER)
        .query(
          Q.where(columns.User.ownUser, true),
          Q.sortBy(columns.User.createdAt, "desc"),
          Q.take(1),
        )
        .fetch();
      const user = userResponse.at(0);
      if (user) {
        return await user.update((user) => {
          user.preferredBoulderGrade = input.preferredBoulderGrade;
          user.preferredSportGrade = input.preferredSportGrade;
          user.preferredTradGrade = input.preferredTradGrade;
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
};

type Options = {
  onSuccess?: (
    result: Awaited<ReturnType<typeof setUserGradingSystems>>,
    params: Parameters<typeof setUserGradingSystems>[number],
  ) => void;
};

const useSetUserGradingSystemMutation = (options?: Options) => {
  const queryClient = useQueryClient();
  return useMutation(setUserGradingSystems, {
    onSuccess: (data, params) => {
      queryClient.invalidateQueries([LOCAL_DATABASE]);
      options?.onSuccess?.(data, params);
    },
  });
};

export default useSetUserGradingSystemMutation;
