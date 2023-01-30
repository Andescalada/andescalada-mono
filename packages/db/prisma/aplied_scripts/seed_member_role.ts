import { PrismaClient, RoleNames } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
  console.log("Start seeding seed_member_role ...");
  const memberRole = await prisma.role.create({
    data: {
      name: RoleNames.Member,
      permissions: { connect: [{ action: "GrantAccess" }, { action: "Read" }] },
    },
  });

  console.log(`Member role created with id ${memberRole.id}`);
}
