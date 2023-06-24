import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const table = "RouteEvaluation";
  const lastPulledAt = new Date(0);
  const userId = "3acdf5eb-36aa-4b02-a3ae-bad7d0b5721f";

  const updated = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${table} WHERE updatedAt > ? AND isDeleted = ? AND createdAt < ? AND userId = ?`,
    lastPulledAt,
    "NotDeleted",
    lastPulledAt,
    userId,
  );
  const created = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${table} WHERE createdAt > ? AND isDeleted = ? AND userId = ?`,
    lastPulledAt,
    "NotDeleted",
    userId,
  );
  const deleted = await prisma
    .$queryRawUnsafe<{ id: string }[]>(
      `SELECT id FROM ${table} WHERE updatedAt > ? AND isDeleted != ? AND userId = ?`,
      lastPulledAt,
      "NotDeleted",
      userId,
    )
    .then((routes) => routes.map((route) => route.id));

  console.log({ updated, created, deleted });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
