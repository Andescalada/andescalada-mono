import { database } from "@local-database/index";
import { User } from "@local-database/model";
import { Tables } from "@local-database/model/schema";
import { useMutation } from "@tanstack/react-query";

const addUser = async (input: {
  id: string;
  email: string;
  name: string;
  username: string;
}) => {
  const res = await database.get<User>(Tables.USERS).create((user) => {
    user._raw.id = input.id;
    user.email = input.email;
    user.name = input.name;
    user.username = input.username;
    user.backendId = input.id;
  });

  return res;
};

const useAddUserMutation = () => {
  return useMutation(addUser);
};

export default useAddUserMutation;
