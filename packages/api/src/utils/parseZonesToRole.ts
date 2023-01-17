import { InfoAccess, RoleNames } from "@prisma/client";

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

type Z = {
  [key in RoleNames]: Zone[];
};

const parseZonesToRole = (item: Item) => {
  const initialZone: Z = {
    [RoleNames.Admin]: [],
    [RoleNames.Collaborator]: [],
    [RoleNames.Editor]: [],
    [RoleNames.Reader]: [],
    [RoleNames.Reviewer]: [],
    [RoleNames.Member]: [],
  };

  if (!item) return undefined;

  const sortedRoles = item.RoleByZone.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const roles = sortedRoles.reduce((prev, current) => {
    prev[current.Role.name] = [...prev[current.Role.name], current.Zone];
    return prev;
  }, initialZone);

  const res = Object.entries(roles)
    .filter((r) => r[1].length > 0)
    .map((r) => ({
      role: r[0] as RoleNames,
      zones: r[1],
    }));

  return res;
};

export default parseZonesToRole;
