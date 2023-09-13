import { PrismaClient, VerificationStatus } from "@andescalada/db";
import { oldDb } from "@andescalada/old-db";

import verification from "./current-verified";

const oldDbClient = new oldDb.PrismaClient();
const db = new PrismaClient();

const main = async () => {
  const route = await db.route.findUnique({
    where: { id: "45b71322-0cdb-4fd1-a74c-ddbaac5ebc3e" },
    include: { RouteGradeEvaluation: true },
  });

  console.log(JSON.stringify(route, null, 2));
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
