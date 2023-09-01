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
  const submissions = await db.userPhotoContestTopo.findMany({
    where: {
      Topo: { Wall: { name: "Transilvania" } },
      isSubmitted: true,
      userId: "d71acc21-aa80-472d-96a5-9ef670a69722",
    },
    include: { User: true },
  });

  const deleted = await db.userPhotoContestTopo.delete({
    where: { id: "81d0a0e1-e302-4e78-9214-fb46b809e812" },
  });

  console.info(deleted);
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
