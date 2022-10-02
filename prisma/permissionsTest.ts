import { PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis/with-fetch";
import superjson from "superjson";
import { SuperJSONResult } from "superjson/src/types";

const prisma = new PrismaClient();
const access = Redis.fromEnv();

type Permissions = Set<
  | "Create"
  | "Update"
  | "Read"
  | "Delete"
  | "GrantAccess"
  | "RevokeAccess"
  | "DenyAccess"
>;

const zoneId = "1cc1a819-c576-4bd1-a787-e38838a80bd4";

const userEmail = "elevy@andescalada.org";
// const userEmail = "elevyg91@gmail.com";

const main = async () => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: userEmail },
    select: {
      RoleByZone: {
        select: {
          Role: { select: { permissions: { select: { action: true } } } },
        },
      },
    },
  });

  const permissions = user.RoleByZone.flatMap((r) => r.Role)
    .flatMap((p) => p.permissions)
    .flatMap((a) => a.action);

  console.log("All permissions", permissions);

  const uniquePermissions = new Set(permissions);

  console.log("Unique Permissions", uniquePermissions);

  const obj = superjson.serialize(uniquePermissions);

  await access.hset(userEmail, { [zoneId]: obj });

  const p = await access.hget<SuperJSONResult>(userEmail, zoneId);
  console.log(p);

  if (!p) throw new Error("No access permissions found");
  const de = superjson.deserialize<Permissions>(p);
  console.log(de);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
