import { PrismaClient } from "@prisma/client";

import permissions5 from "./aplied_scripts/new_seed_permission_01_09_2023";
import permissions6 from "./aplied_scripts/new_seed_permission_02_09_2023";
import agreementsScript from "./aplied_scripts/seed_agreements";
import permissions4 from "./aplied_scripts/seed_edit_zone_permission_28_02_2023";
import memberRole from "./aplied_scripts/seed_member_role";
import permissions1 from "./aplied_scripts/seed_new_permissions_20-01-2023";
import permissions2 from "./aplied_scripts/seed_new_permissions_21-01-2023";
import permissions3 from "./aplied_scripts/seed_new_permissions_22-01-2023";
import permissions0 from "./aplied_scripts/seed_new_permissions_27_12_2022";
import seedRoles from "./aplied_scripts/seed_roles";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.create({
      data: {
        email: "elevy@andescalada.org",
        name: "Eyal",
        username: "eyal_admin",
      },
    });
  } catch (e) {
    console.error(e);
  }

  await seedRoles();
  await agreementsScript();
  await memberRole();
  await permissions0();
  await permissions1();
  await permissions2();
  await permissions3();
  await permissions4();
  await permissions5();
  await permissions6();
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
