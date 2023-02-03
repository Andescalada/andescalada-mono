import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const latLong = await prisma.location.findMany({
    select: { latitude: true, longitude: true, id: true },
  });

  console.log("Prisma client version:", Prisma.prismaVersion.client);
  console.log(latLong);

  for (const l of latLong) {
    await prisma.$executeRaw`UPDATE Location SET coordinates = POINT(${l.latitude}, ${l.longitude}) WHERE id = ${l.id}`;
  }

  const result =
    await prisma.$queryRaw`SELECT latitude, longitude, ST_X(coordinates), ST_Y(coordinates) FROM Location`;
  console.log("Raw query:");
  console.log(result);
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
