import { PrismaClient, SoftDelete, VerificationStatus } from "@andescalada/db";
import { oldDb } from "@andescalada/old-db";

import verification from "./current-verified";

const oldDbClient = new oldDb.PrismaClient();
const db = new PrismaClient();

const main = async () => {
  const sectors = await db.sector.findMany({
    include: { walls: { where: { isDeleted: SoftDelete.NotDeleted } } },
  });
  for (const sector of sectors) {
    console.log(`Sector: ${sector.name} -----------------`);
    for (const [i, wall] of sector.walls.entries()) {
      console.log(wall.name);
      console.log("Previous position", wall.position);
      const res = await db.wall.update({
        where: { id: wall.id },
        data: { position: i },
      });
      console.log("New position", res.position);
    }
  }

  // console.log(JSON.stringify(sectors, null, 2));
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
