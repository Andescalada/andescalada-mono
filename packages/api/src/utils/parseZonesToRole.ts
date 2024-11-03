import { rolesObject } from "@andescalada/api/src/utils/rolesObject";
import { InfoAccess, RoleNames } from "@andescalada/db";

type Zone = {
  id: string;
  name: string;
  infoAccess: InfoAccess;
};

type Item = {
  RoleByZone: {
    createdAt: Date;
    Role: {
      name: RoleNames;
    };
    Zone: Zone;
  }[];
} | null;

const parseZonesToRole = (item: Item) => {
  const initialRolesList = rolesObject<Zone>();

  if (!item) return undefined;

  const sortedRoles = item.RoleByZone.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const roles = sortedRoles.reduce((prev, current) => {
    prev[current.Role.name] = [...prev[current.Role.name], current.Zone];
    return prev;
  }, initialRolesList);

  const res = Object.entries(roles)
    .filter((r) => r[1].length > 0)
    .map((r) => ({
      role: r[0] as RoleNames,
      zones: r[1],
    }));

  return res;
};

export default parseZonesToRole;
