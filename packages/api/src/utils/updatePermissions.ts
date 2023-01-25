import type { PermissionActions } from "@prisma/client";
import type { Redis } from "@upstash/redis";
import { serialize } from "superjson";

const updateRedisPermissions = async (
  access: Redis,
  userEmail: string,
  zoneId: string,
  newPermissions: PermissionActions[],
) => {
  const updatedPermissions = new Set(newPermissions);

  await access.hset(userEmail, {
    [zoneId]: serialize(updatedPermissions),
  });

  return updatedPermissions;
};

export default updateRedisPermissions;
