import type { PermissionActions } from "@andescalada/db";
import type { Redis } from "@upstash/redis";
import { serialize } from "superjson";

const updateRedisPermissions = async (
  access: Redis,
  userId: string,
  zoneId: string,
  updatedPermissions: Set<PermissionActions>,
) => {
  await access.hset(userId, {
    [zoneId]: serialize(updatedPermissions),
  });

  return updatedPermissions;
};

export default updateRedisPermissions;
