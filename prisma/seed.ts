import { Prisma, PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis";
const prisma = new PrismaClient();
const permission = Redis.fromEnv();

const testUserData: Prisma.UserCreateInput = {
  name: "Test",
  email: "test@test.com",
  username: "test",
};

const sectorData: Prisma.SectorCreateInput = {
  name: "Zona Diabólica",
  slug: "zona-diabolica",
  Zone: {
    create: {
      name: "Zona de test ",
      slug: "zona-de-test",
      infoAccess: "Community",
    },
  },
  Author: { connect: { email: "test@test.com" } },
};

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

  console.log(`Creating a sector and a zone`);
  const sector = await prisma.sector.create({ data: sectorData });
  console.log(
    `Sector and zone created successfully, with zone id ${sector.zoneId}`,
  );

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
    `Role **Editor** created for user **test** for **Zona de test** `,
  );

  const roleByZone = await prisma.roleByZone.create({
    data: {
      Role: { connect: { name: "Editor" } },
      User: { connect: { username: "test" } },
      Zone: { connect: { id: sector.zoneId } },
    },
  });

  const permissionsOfRole = await prisma.role.findUnique({
    where: { name: "Editor" },
    select: { permissions: { select: { action: true } } },
  });

  if (permissionsOfRole) {
    const permissionsObject = {};

    const permissions = permissionsOfRole.permissions.map((p) => p.action);
  }

  const p = await permission.set(`${user.id}:${sector.zoneId}`, "");

  console.log(`Role by zone created successfully`, roleByZone);

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
