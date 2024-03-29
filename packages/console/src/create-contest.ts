import { PrismaClient } from "@andescalada/db";

const db = new PrismaClient();

const selectedZonesForContest = [
  // "Las Chilcas",
  // "Las Palestras",
  // "Chacabuco",
  // "Lo Curro",
  // "Petorca",
];

export const createContest = async () => {
  const chilcas = await db.zone.findFirst({
    where: { name: "Cuesta Las Chilcas" },
  });
  const chacabuco = await db.zone.findFirst({ where: { name: "Chacabuco" } });
  if (!chilcas) throw new Error("Zone Las Chilcas not found");
  if (!chacabuco) throw new Error("Zone Chacabuco not found");

  const starting = new Date(2023, 6, 14, 20, 0, 0); // '23:59:59 14-07-2023'
  const ending = new Date(2023, 6, 31, 23, 59, 59); // '23:59:59 31-07-2023'

  const contestExist = await db.photoContest.findFirst({
    where: {
      starting,
      ending,
      Zones: { every: { OR: [{ id: chacabuco.id }, { id: chilcas.id }] } },
    },
  });

  if (!!contestExist) {
    throw new Error("Contest exist!");
  }

  const contest = await db.photoContest.create({
    data: {
      starting,
      ending,
      Zones: { connect: [{ id: chilcas.id }, { id: chacabuco.id }] },
    },
  });
  console.log("Contest created successfully 🎉", contest);
};
