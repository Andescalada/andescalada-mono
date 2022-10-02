import { Prisma, PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis";
import fetch from "node-fetch";
import superjson from "superjson";

const prisma = new PrismaClient();
const permission = Redis.fromEnv();

type Permissions = Set<
  | "Create"
  | "Update"
  | "Read"
  | "Delete"
  | "GrantAccess"
  | "RevokeAccess"
  | "DenyAccess"
>;

const setPermissions = (key: string, value: string) =>
  fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${key}/${value}`, {
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    },
  });
const getPermissions = (key: string) =>
  fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/${key}`, {
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    },
  });

const roleToAssign = "Editor";

const zoneId = "1cc1a819-c576-4bd1-a787-e38838a80bd4";

const collaboratorId = "112b0c22-75b5-4014-8c3d-4a8a4a255ff6";
const editorId = "d3e60170-40f8-4f1d-91c7-7256d2b8ba20";

const userId = "b41d79e1-e145-4e74-b175-b0cb8068a448";

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

  const obj = superjson.stringify({ permissions: uniquePermissions });

  await setPermissions(`${userEmail}:${zoneId}`, obj);

  const p = await getPermissions(`${userEmail}:${zoneId}`);

  const res = await p.json();
  const data = await res.result;

  if (data) {
    const pR: { permissions: Permissions } = superjson.parse(data);

    console.log(pR.permissions.has("Read"));
    console.log("parsed permissions from redis", pR);
  }

  // console.log("Redis res", res);
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
