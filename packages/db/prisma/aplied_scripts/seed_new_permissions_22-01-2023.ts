import { Prisma, PrismaClient, RoleNames } from "@prisma/client";
import { Redis } from "@upstash/redis/with-fetch";
import { serialize } from "superjson";

const prisma = new PrismaClient();
const access = Redis.fromEnv();

const permissionsData: Prisma.PermissionsCreateInput[] = [
  { action: "PauseZoneAccess" },
];

export default async function main() {
  console.log(`Start seeding seed_new_permissions_22-01-2023 ...`);

  console.log(`Creating permissions`);
  for (const p of permissionsData) {
    await prisma.permissions.create({
      data: p,
    });
  }
  console.log(`All permissions created successfully`);

  console.log(`Updating admin role`);

  await prisma.role.update({
    where: { name: RoleNames.Admin },
    data: {
      permissions: {
        connect: [
          { action: "PauseZoneAccess" },
          { action: "EditZoneAgreements" },
        ],
      },
    },
  });

  console.log(`All roles created successfully`);

  const usersToUpdate = await prisma.roleByZone.findMany({
    where: { Role: { name: RoleNames.Admin } },
    select: {
      zoneId: true,
      User: { select: { id: true } },
      Role: { select: { permissions: { select: { action: true } } } },
    },
  });

  for (const user of usersToUpdate) {
    const id = user.User.id;
    const zoneId = user.zoneId;
    const permissions = user.Role.permissions.flatMap((p) => p.action);
    console.log(id, zoneId, permissions);

    const permissionSet = new Set(permissions);

    const updateRedis = await access.hset(id, {
      [zoneId]: serialize(permissionSet),
    });
    console.log(updateRedis <= 0 ? "Redis Updated" : "Redis Not updated");
  }

  console.log(`Update finished.`);
}
