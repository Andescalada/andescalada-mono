import { Redis } from "@upstash/redis/with-fetch";
import { serialize } from "superjson";

const access = new Redis({
  url: "https://us1-rational-wahoo-38618.upstash.io",
  token:
    "AZbaASQgNmViNjUyM2UtMWNiNy00NGRjLWJkNDktZThjMzNiYTk0ZmRmNDRlOTg1MjA5NjA0NDk1Zjg4OTE1MjA2ZTAzZDczZjM=",
});

const userAdminEmail = "elevy@andescalada.org";

async function main() {
  const uniquePermissions = new Set([
    "Create",
    "Update",
    "Read",
    "Delete",
    "GrantAccess",
    "RevokeAccess",
    "DenyAccess",
  ]);
  console.log(`permissions Private ${uniquePermissions}`);
  const obj1 = serialize(uniquePermissions);

  await access.hset(userAdminEmail, {
    ["09827972-67b0-4ba0-99bd-2ba4ae8ee224"]: obj1,
  });

  console.log(`Role saved in Redis successfully`);

  console.log(
    `Role **Admin** created for user **elevy_admin** for **Zona Comunitaria** `,
  );

  console.log(`Role by zone created successfully`);

  console.log(`Saving roles in Redis`);

  const uniquePermissionsCommunity = new Set([
    "Create",
    "Update",
    "Read",
    "Delete",
    "GrantAccess",
    "RevokeAccess",
    "DenyAccess",
  ]);
  console.log(`permissions Community ${uniquePermissionsCommunity}`);
  const obj2 = serialize(uniquePermissions);

  await access.hset(userAdminEmail, {
    ["0f740c0b-39db-4964-a58f-a502cd605919"]: obj2,
  });

  console.log(`Role saved in Redis successfully`);

  console.log(`Seeding finished.`);
}

main();
