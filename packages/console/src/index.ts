import { PrismaClient } from "@andescalada/db";
import { oldDb } from "@andescalada/old-db";

import { migrateLegacyZone } from "./migrate-legacy-zone";

const oldDbClient = new oldDb.PrismaClient();
const db = new PrismaClient();

const main = async () => {
  const deleteOldPetorca = await db.zone
    .delete({
      where: { id: "90936ed0-b5d3-4f7c-98d4-3118ca44dd81" },
    })
    .catch((e) => console.error(e));

  console.log(deleteOldPetorca);

  const benja = await db.user.findUniqueOrThrow({
    where: { username: "bemarchant" },
  });

  const eyal = await db.user.findUniqueOrThrow({
    where: { username: "elevy" },
  });

  const petorca = await db.zone.create({
    data: {
      name: "Petorca",
      slug: "petorca",
      Author: { connect: { id: benja.id } },
      RoleByZone: {
        create: {
          Role: { connect: { name: "Admin" } },
          User: { connect: { id: benja.id } },
          AssignedBy: { connect: { id: eyal.id } },
        },
      },
    },
  });

  await db.roleByZone.create({
    data: {
      Role: { connect: { name: "Reviewer" } },
      User: { connect: { id: eyal.id } },
      AssignedBy: { connect: { id: eyal.id } },
      Zone: { connect: { id: petorca.id } },
    },
  });

  const migration = migrateLegacyZone({
    zoneId: petorca.id,
    authorId: benja.id,
    legacyZoneName: "Petorca",
  });

  console.log(migration);
};

main()
  .then(async () => {
    await oldDbClient.$disconnect();
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await oldDbClient.$disconnect();
    await db.$disconnect();
    process.exit(1);
  });
