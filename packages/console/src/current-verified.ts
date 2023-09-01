import { PrismaClient } from "@andescalada/db";

const db = new PrismaClient();

const main = async () => {
  const verifiedTopos = await db.topo.findMany({
    where: { UserPhotoContestTopo: { none: { id: { equals: undefined } } } },
    select: { id: true },
  });

  const toposFromContest = await db.topo.findMany({
    where: { UserPhotoContestTopo: { some: { id: { not: undefined } } } },
    select: { id: true },
  });

  for (const topo of verifiedTopos) {
    console.log(`Adding verification to topo ${topo.id}`);
    await db.topo.update({
      where: { id: topo.id },
      data: {
        Verification: {
          create: {
            VerifierUser: { connect: { email: "elevy@andescalada.org" } },
            status: "Approved",
          },
        },
      },
    });
    console.log(`Verification added to topo ${topo.id}`);
  }
  console.log(`======================================`);

  for (const topo of toposFromContest) {
    console.log(`Adding verification to topo ${topo.id}`);
    await db.topo.update({
      where: { id: topo.id },
      data: {
        Verification: {
          create: {},
        },
      },
    });
    console.log(`Verification added to topo ${topo.id}`);
  }
  console.log(`Photo contest not verified topos: ${toposFromContest.length}`);
};

export default main;
