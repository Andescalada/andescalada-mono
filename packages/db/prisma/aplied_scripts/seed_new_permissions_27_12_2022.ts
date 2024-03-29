import { Prisma, PrismaClient, RoleNames } from "@prisma/client";
import { Redis } from "@upstash/redis/with-fetch";
import { serialize } from "superjson";

const prisma = new PrismaClient();
const access = Redis.fromEnv();

const permissionsData: Prisma.PermissionsCreateInput[] = [
  { action: "ApproveZone" },
  { action: "RejectZone" },
  { action: "PauseZonePublication" },
  { action: "PublishZone" },
  { action: "RequestZoneReview" },
  { action: "UnpublishZone" },
];

export default async function main() {
  console.log(`Start seeding seed_new_permissions_27_12_2022 ...`);

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
          { action: "PauseZonePublication" },
          { action: "PublishZone" },
          { action: "RequestZoneReview" },
        ],
      },
    },
  });

  await prisma.role.create({
    data: {
      name: RoleNames.Reviewer,
      permissions: {
        connect: [
          { action: "ApproveZone" },
          { action: "RejectZone" },
          { action: "UnpublishZone" },
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
    console.log(updateRedis > 0 ? "Redis Updated" : "Redis Not updated");
  }

  console.log(`Update finished.`);
}
