import { PrismaClient } from "@andescalada/db";

const db = new PrismaClient();

export const createContest = async () => {
  const starting = new Date();

  const chilcas = await db.zone.findFirst({
    where: { name: "Cuesta Las Chilcas" },
  });
  const chacabuco = await db.zone.findFirst({ where: { name: "Chacabuco" } });
  if (!chilcas) throw new Error("Zone Las Chilcas not found");
  if (!chacabuco) throw new Error("Zone Chacabuco not found");
  const ending = new Date();
  ending.setDate(starting.getDate() + 14);
  const zones = await db.photoContest.create({
    data: {
      starting,
      ending,
      Zones: { connect: [{ id: chilcas.id }, { id: chacabuco.id }] },
    },
  });
  console.log("Zones created", zones);
};
