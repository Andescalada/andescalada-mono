import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Populating userId in History table");

  const history = await prisma.history.findMany({
    select: { id: true, user: { select: { id: true } } },
  });

  console.log(`${history.length} history records fetched`);

  for (const h of history) {
    console.log(chalk.yellow(`Updating history record ${h.id}`));
    await prisma.history.update({
      where: { id: h.id },
      data: { userId: h.user.id },
    });
  }

  console.log(
    chalk.green(
      "userId column populated in history table",
      `${history.length} rows modified`,
    ),
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
