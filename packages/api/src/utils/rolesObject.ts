import { RoleNames } from "@prisma/client";

type Z<T> = {
  [key in RoleNames]: T[];
};

export const rolesObject = <T>(): Z<T> => ({
  [RoleNames.Admin]: [],
  [RoleNames.Collaborator]: [],
  [RoleNames.Editor]: [],
  [RoleNames.Reader]: [],
  [RoleNames.Reviewer]: [],
  [RoleNames.Member]: [],
});
