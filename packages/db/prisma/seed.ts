import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

const LanguagesData: Prisma.LanguageCreateInput[] = [
  { languageId: "es", languageName: "Español" },
  { languageId: "en", languageName: "English" },
];

async function main() {
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

  console.log(`Creating languages`);
  for (const l of LanguagesData) {
    await prisma.language.create({
      data: l,
    });
  }
  console.log(`All languages created successfully`);

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
