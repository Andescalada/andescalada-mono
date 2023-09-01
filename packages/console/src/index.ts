import { PrismaClient, VerificationStatus } from "@andescalada/db";
import { oldDb } from "@andescalada/old-db";

import verification from "./current-verified";

const oldDbClient = new oldDb.PrismaClient();
const db = new PrismaClient();

const main = async () => {
  const topos = await db.topo.findMany({
    where: {
      // Wall: { Sector: { Zone: { id: input.zoneId } } },
      Verification: { status: VerificationStatus.Pending },
      UserPhotoContestTopo: { every: { isSubmitted: true } },
    },
    include: { UserPhotoContestTopo: true },
  });

  console.log(JSON.stringify(topos, null, 2));
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
