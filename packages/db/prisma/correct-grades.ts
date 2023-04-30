import { gradeUnits } from "@andescalada/common-assets/climbingGrades";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // console.log("updating french grades");
  // const gradesUpdated = await prisma.routeGrade.updateMany({
  //   where: { originalGradeSystem: "French" },
  //   data: { grade: { increment: 1 } },
  // });
  // console.log(`${gradesUpdated.count} french grades updated`);

  console.log("updating original system grades");

  const grades = await prisma.routeGrade.findMany();

  console.log(`${grades.length} grades fetched`);

  grades.forEach(async ({ grade, originalGradeSystem, id }) => {
    await prisma.routeGrade.update({
      where: { id },
      data: {
        originalGrade: grade
          ? gradeUnits[originalGradeSystem][grade]
          : "no grade",
      },
    });
  });

  console.log("original grades updated");
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
