import { slug } from "@andescalada/api/src/utils/slug";
import { PrismaClient } from "@andescalada/db";
import { oldDb } from "@andescalada/old-db";

import { migrateLegacyZone } from "./migrate-legacy-zone";

const oldDbClient = new oldDb.PrismaClient();
const db = new PrismaClient();

const selectedZonesForContest = [
  // "Las Chilcas",
  "Las Palestras",
  "Chacabuco",
  "Lo Curro",
  "Petorca",
];

const main = async () => {
  const starting = new Date();
  const chilcas = await db.zone.findFirst({
    where: { name: "Cuesta Las Chilcas" },
  });
  const chacabuco = await db.zone.findFirst({ where: { name: "Chacabuco" } });

  if (!chilcas) throw new Error("Zone Las Chilcas not found");
  if (!chacabuco) throw new Error("Zone Chacabuco not found");

  const ending = new Date();
  ending.setDate(starting.getDate() + 14);

  const zones = await db.photoContest.create({
    data: {
      starting,
      ending,
      Zones: { connect: [{ id: chilcas.id }, { id: chacabuco.id }] },
    },
  });

  console.log("Zones created", zones);
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
