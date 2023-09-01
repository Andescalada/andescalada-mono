import { PrismaClient } from "@andescalada/db";

const db = new PrismaClient();

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

export default main;
