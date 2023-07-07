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
  const author = await db.user.findUniqueOrThrow({
    where: {
      email: "elevy@andescalada.org",
    },
  });

  const newZones = selectedZonesForContest.map((zone) => {
    return db.zone.create({
      data: {
        name: zone,
        slug: slug(zone),
        Author: { connect: { id: author.id } },
      },
      select: { id: true, name: true },
    });
  });

  const newZonesResult = await Promise.all(newZones);

  for (const zone of newZonesResult) {
    migrateLegacyZone({
      authorId: author.id,
      zoneId: zone.id,
      legacyZoneName: zone.name,
    });
  }
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
