import { rolesObject } from "@andescalada/api/src/utils/rolesObject";
import { Role, RoleByZone, RoleNames } from "@andescalada/db";

export type User = {
  profilePhoto: {
    publicId: string | null;
  } | null;
  id: string;
  name: string;
  username: string;
};

type Item =
  | (RoleByZone & {
      User: {
        profilePhoto: {
          publicId: string | null;
        } | null;
        id: string;
        name: string;
        username: string;
      };
      Role: Role;
    })[]
  | undefined;

const parseUsersToRole = (item: Item) => {
  const initialRolesList = rolesObject<User>();

  if (!item) return undefined;

  const roles = item.reduce((prev, current) => {
    prev[current.Role.name] = [...prev[current.Role.name], current.User];
    return prev;
  }, initialRolesList);

  const res = Object.entries(roles)
    .filter((r) => r[1].length > 0)
    .map((r) => ({
      role: r[0] as RoleNames,
      users: r[1],
    }));

  return res;
};

export default parseUsersToRole;
