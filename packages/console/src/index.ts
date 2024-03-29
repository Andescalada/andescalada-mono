import { PrismaClient } from "@andescalada/db";
import { oldDb } from "@andescalada/old-db";

const oldDbClient = new oldDb.PrismaClient();
const db = new PrismaClient();

const main = async () => {
  return;
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
