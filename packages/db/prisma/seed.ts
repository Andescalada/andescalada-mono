import { Prisma, PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis/with-fetch";
import { serialize } from "superjson";

const prisma = new PrismaClient();
const access = Redis.fromEnv();

const userEmail = "elevyg91@gmail.com";

const testUserData: Prisma.UserCreateInput = {
  name: "Eyal Levy",
  email: userEmail,
  username: "eyalll",
  firstLogin: false,
};

const userAdminEmail = "elevy@andescalada.org";

const testUserAdmin: Prisma.UserCreateInput = {
  name: "Eyal Levy (Admin)",
  email: userAdminEmail,
  username: "elevy_admin",
  firstLogin: false,
};

const sectorData: Prisma.SectorCreateInput[] = [
  {
    name: "Sector test",
    slug: "Sector-test",
    Zone: {
      create: {
        name: "Zona Privada",
        slug: "zona-privada",
        infoAccess: "Private",
      },
    },
    Author: { connect: { email: userEmail } },
  },
  {
    name: "Sector Test Comunitario",
    slug: "sector-test-comunitario",
    Zone: {
      create: {
        name: "Zona Comunitaria",
        slug: "zona-comunitaria",
        infoAccess: "Community",
      },
    },
    Author: { connect: { email: userEmail } },
  },
  {
    name: "Sector Test Publico",
    slug: "sector-test-publico",
    Zone: {
      create: {
        name: "Zona Pública",
        slug: "zona-publica",
        infoAccess: "Public",
      },
    },
    Author: { connect: { email: userEmail } },
  },
];

const permissionsData: Prisma.PermissionsCreateInput[] = [
  { action: "Create" },
  { action: "Read" },
  { action: "Update" },
  { action: "Delete" },
  { action: "DenyAccess" },
  { action: "GrantAccess" },
  { action: "RevokeAccess" },
];

const rolesData: Prisma.RoleCreateInput[] = [
  { name: "Reader", permissions: { connect: { action: "Read" } } },
  {
    name: "Collaborator",
    permissions: { connect: [{ action: "Read" }, { action: "Create" }] },
  },
  {
    name: "Editor",
    permissions: {
      connect: [
        { action: "Read" },
        { action: "Create" },
        { action: "Update" },
        { action: "Delete" },
      ],
    },
  },
  {
    name: "Admin",
    permissions: {
      connect: [
        { action: "Read" },
        { action: "Create" },
        { action: "Update" },
        { action: "Delete" },
        { action: "GrantAccess" },
        { action: "RevokeAccess" },
        { action: "DenyAccess" },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  console.log(`Creating user`);
  const user = await prisma.user.create({ data: testUserData });
  console.log(`User created with id ${user.id}`);
  console.log(`Creating admin user`);
  const userAdmin = await prisma.user.create({ data: testUserAdmin });
  console.log(`Admin user created with id ${userAdmin.id}`);

  console.log(`Cleaning up info in Redis`);
  await access.del(userEmail);
  await access.del(userAdminEmail);
  console.log(`Cleaning up info in Redis finished`);

  console.log(`Creating a sector and a zone`);
  const zonesId = await Promise.all(
    sectorData.map(async (s) => {
      const sector = await prisma.sector.create({ data: s });
      return sector.zoneId;
    }),
  );

  console.log(`${zonesId.length} sector and zone created successfully`);

  console.log(`Creating permissions`);
  for (const p of permissionsData) {
    await prisma.permissions.create({
      data: p,
    });
  }
  console.log(`All permissions created successfully`);

  console.log(`Creating roles`);
  for (const r of rolesData) {
    await prisma.role.create({
      data: r,
    });
  }
  console.log(`All roles created successfully`);

  console.log(
    `Role **Admin** created for user **elevy_admin** for **Zona Privada** `,
  );

  const rolePrivateZone = await prisma.roleByZone.create({
    data: {
      Role: { connect: { name: "Admin" } },
      User: { connect: { email: userEmail } },
      Zone: { connect: { id: zonesId[0] } },
      AssignedBy: { connect: { email: userAdminEmail } },
    },
    select: { Role: { select: { permissions: { select: { action: true } } } } },
  });

  console.log(`Role by zone created successfully`);

  console.log(`Saving roles in Redis`);

  const permissionsActions = rolePrivateZone.Role.permissions.flatMap(
    (r) => r.action,
  );

  const uniquePermissions = new Set(permissionsActions);
  console.log(`permissions Private ${uniquePermissions}`);
  const obj1 = serialize(uniquePermissions);

  await access.hset(userEmail, { [zonesId[0]]: obj1 });

  console.log(`Role saved in Redis successfully`);

  console.log(
    `Role **Admin** created for user **elevy_admin** for **Zona Comunitaria** `,
  );

  const roleCommunityZone = await prisma.roleByZone.create({
    data: {
      Role: { connect: { name: "Editor" } },
      User: { connect: { email: userEmail } },
      Zone: { connect: { id: zonesId[1] } },
      AssignedBy: { connect: { email: userAdminEmail } },
    },
    select: { Role: { select: { permissions: { select: { action: true } } } } },
  });

  console.log(`Role by zone created successfully`);

  console.log(`Saving roles in Redis`);

  const permissionsActionsCommunity =
    roleCommunityZone.Role.permissions.flatMap((r) => r.action);

  const uniquePermissionsCommunity = new Set(permissionsActionsCommunity);
  console.log(`permissions Community ${uniquePermissionsCommunity}`);
  const obj2 = serialize(uniquePermissions);

  await access.hset(userEmail, { [zonesId[1]]: obj2 });

  console.log(`Role saved in Redis successfully`);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
