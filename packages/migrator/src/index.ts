import { PrismaClient } from "@andescalada/db";
import { oldDb } from "@andescalada/old-db";

const oldDbClient = new oldDb.PrismaClient();
const db = new PrismaClient();

const selectedZonesForContest = [
  "Las Chilcas",
  "Las Palestras",
  "Chacabuco",
  "Lo Curro",
  "Petorca",
];

const main = async () => {
  const zones = await oldDbClient.zones.findMany({
    where: {
      name: {
        in: selectedZonesForContest,
      },
    },
    select: { name: true, _count: true },
  });
  console.log(zones);
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
