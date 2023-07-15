import { slug } from "@andescalada/api/src/utils/slug";
import { PrismaClient } from "@andescalada/db";
import { oldDb } from "@andescalada/old-db";

import { createContest } from "./create-contest";
import { migrateLegacyZone } from "./migrate-legacy-zone";

const oldDbClient = new oldDb.PrismaClient();
const db = new PrismaClient();

const selectedZonesForContest = [
  // "Las Chilcas",
  // "Las Palestras",
  // "Chacabuco",
  // "Lo Curro",
  // "Petorca",
];

const main = async () => {
  await createContest();
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
