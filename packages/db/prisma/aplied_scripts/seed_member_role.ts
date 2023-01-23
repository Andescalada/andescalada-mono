import { PrismaClient, RoleNames } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const memberRole = await prisma.role.create({
    data: {
      name: RoleNames.Member,
      permissions: { connect: [{ action: "GrantAccess" }, { action: "Read" }] },
    },
  });

  console.log(`Member role created with id ${memberRole.id}`);
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
