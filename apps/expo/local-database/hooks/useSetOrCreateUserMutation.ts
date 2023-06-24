import { GradeSystemsSchema } from "@andescalada/db/zod";
import { database } from "@local-database/index";
import { User } from "@local-database/model";
import { Table } from "@local-database/model/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const setOrCreateUser = async (input: {
  id: string;
  email: string;
  name: string;
  username: string;
  ownUser?: boolean;
  preferredSportGrade: typeof GradeSystemsSchema._type;
  preferredTradGrade: typeof GradeSystemsSchema._type;
  preferredBoulderGrade: typeof GradeSystemsSchema._type;
}) => {
  await database.write(async () => {
    try {
      const user = await database
        .get<User>(Table.USER)
        .find(input.id)
        .catch(() => null);
      if (user) {
        return await user.update((user) => {
          user.email = input.email;
          user.name = input.name;
          user.username = input.username;

          user.ownUser = input.ownUser ?? false;
          user.preferredBoulderGrade = input.preferredBoulderGrade;
          user.preferredSportGrade = input.preferredSportGrade;
          user.preferredTradGrade = input.preferredTradGrade;
        });
      }
      return await database.get<User>(Table.USER).create((user) => {
        user._raw.id = input.id;
        user.email = input.email;
        user.name = input.name;
        user.username = input.username;
        user.ownUser = input.ownUser ?? false;
        user.preferredBoulderGrade = input.preferredBoulderGrade;
        user.preferredSportGrade = input.preferredSportGrade;
        user.preferredTradGrade = input.preferredTradGrade;
      });
    } catch (error) {
      console.error(error);
    }
  });
};

const useSetOrCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(setOrCreateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["local-database"]);
    },
  });
};

export default useSetOrCreateUserMutation;
