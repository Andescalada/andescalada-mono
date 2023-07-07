import { slug } from "@andescalada/api/src/utils/slug";
import { gradeUnits } from "@andescalada/common-assets/climbingGrades";
import { Prisma, PrismaClient } from "@andescalada/db";
import { oldDb } from "@andescalada/old-db";
import chalk from "chalk";

const oldDbClient = new oldDb.PrismaClient();
const newDbClient = new PrismaClient();

const main = async () => {
  const lasChilcas = await newDbClient.zone.findFirst({
    where: { name: "Cuesta Las Chilcas" },
    select: { id: true },
  });

  const author = await newDbClient.user.findUnique({
    where: { email: "elevy@andescalada.org" },
  });

  console.log(lasChilcas, author);

  if (!lasChilcas) throw new Error("Zone not found");

  console.log(chalk.blue(`Deleting old data`));
  await newDbClient.sector.deleteMany({ where: { zoneId: lasChilcas.id } });
  console.log(chalk.green(`Old data deleted! 👍🏻`));

  if (!author) throw new Error("Author not found");

  const zones = await oldDbClient.zones.findFirst({
    where: { name: "Las Chilcas" },
    select: {
      name: true,
      sectors: {
        select: {
          name: true,
          walls: {
            select: {
              name: true,
              routes: { select: { id: true, name: true, grade: true } },
            },
          },
        },
      },
    },
  });

  if (zones) {
    await createSectors({
      data: zones,
      zoneId: lasChilcas.id,
      authorId: author.id,
    });
    await createWalls({
      data: zones,
      zoneId: lasChilcas.id,
      authorId: author.id,
    });
    await createRoutes({
      data: zones,
      zoneId: lasChilcas.id,
      authorId: author.id,
    });
  }

  console.log(chalk.green(`Success! 🎉`));
};

const transformGrade = (grade: string | null) => {
  if (!!grade && grade?.search("/") !== -1) {
    const [first] = grade.split("/");
    const beforeSlashGrade = gradeUnits["French"].findIndex((d) => d === first);

    if (beforeSlashGrade === -1) return { grade: null, originalGrade: null };

    return { grade: beforeSlashGrade, originalGrade: first, slashGrade: true };
  }
  if (grade === "Proyecto") {
    return {
      grade: null,
      originalGrade: null,
      project: true,
      slashGrade: false,
    };
  }
  if (!grade) return { grade: null, originalGrade: null, slashGrade: false };

  const numericGrade = gradeUnits["French"].findIndex((d) => d === grade);
  if (numericGrade === -1) return { grade: null, originalGrade: null };

  return { grade: numericGrade, originalGrade: grade, slashGrade: false };
};

const createSectors = async ({
  data,
  zoneId,
  authorId,
}: {
  data: { sectors: { name: string | null }[] };
  zoneId: string;
  authorId: string;
}) => {
  console.log(chalk.blue(`Creating sectors`));
  const mutations: Prisma.PrismaPromise<any>[] = [];
  data?.sectors.forEach(async (sector) => {
    if (sector.name) {
      console.log(chalk.yellow(`Creating sector ${sector.name}`));
      mutations.push(
        newDbClient.sector.create({
          data: {
            name: sector.name,
            slug: slug(sector.name),
            sectorKind: "Wall",
            Author: { connect: { id: authorId } },
            Zone: { connect: { id: zoneId } },
          },
        }),
      );
    }
  });

  await newDbClient.$transaction(mutations);
};

const createWalls = async ({
  data,
  authorId,
  zoneId,
}: {
  data: {
    sectors: { name: string | null; walls: { name: string | null }[] }[];
  };
  zoneId: string;
  authorId: string;
}) => {
  const mutations: Prisma.PrismaPromise<any>[] = [];
  for (const sector of data?.sectors || []) {
    const sectorId = await newDbClient.sector.findFirst({
      where: { name: sector.name || "", zoneId },
      select: { id: true, name: true },
    });
    if (!sectorId) throw new Error(`Sector ${sector.name} not found`);
    for (const wall of sector.walls) {
      if (!wall.name) throw new Error(`Wall ${wall.name} not found`);
      console.log(
        chalk.yellow(`Creating wall ${wall.name} for sector ${sector.name}`),
      );
      mutations.push(
        newDbClient.wall.create({
          data: {
            name: wall.name,
            slug: slug(wall.name),
            Sector: { connect: { id: sectorId.id } },
            Author: { connect: { id: authorId } },
          },
        }),
      );
    }
  }

  await newDbClient.$transaction(mutations);
};

const createRoutes = async ({
  data,
  authorId,
  zoneId,
}: {
  data: {
    sectors: {
      name: string | null;
      walls: {
        name: string | null;
        routes: {
          name: string | null;
          grade: string | null;
          id: bigint | null;
        }[];
      }[];
    }[];
  };
  zoneId: string;
  authorId: string;
}) => {
  const mutations: Prisma.PrismaPromise<any>[] = [];
  for (const sector of data?.sectors || []) {
    const sectorId = await newDbClient.sector.findFirst({
      where: { name: sector.name || "", zoneId },
      select: { id: true, name: true },
    });
    if (!sectorId) throw new Error(`Sector ${sector.name} not found`);
    for (const wall of sector.walls) {
      if (!wall.name) throw new Error(`Wall ${wall.name} not found`);
      const wallId = await newDbClient.wall.findFirst({
        where: { name: wall.name || "", sectorId: sectorId.id },
        select: { id: true, name: true },
      });
      if (!wallId) throw new Error(`Wall ${wall.name} not found`);
      for (const route of wall.routes) {
        const index = wall.routes.findIndex((d) => d.id === route.id);
        if (!route.name) throw new Error(`Route ${route.name} not found`);
        console.log(
          chalk.yellow(
            `Creating route ${
              route.name === "Unknown" ? "Ruta sin nombre" : route.name
            } for wall ${wall.name}`,
          ),
        );
        mutations.push(
          newDbClient.route.create({
            data: {
              name: route.name === "Unknown" ? "Ruta sin nombre" : route.name,
              position: index + 1,
              slug: slug(route.name),
              Author: { connect: { id: authorId } },
              Wall: { connect: { id: wallId.id } },
              kind: "Sport",
              RouteGrade: {
                create: {
                  ...transformGrade(route.grade),
                  originalGradeSystem: "French",
                },
              },
            },
          }),
        );
      }
    }
  }

  await Promise.allSettled(mutations);
};

main()
  .then(async () => {
    await oldDbClient.$disconnect();
    await newDbClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await oldDbClient.$disconnect();
    await newDbClient.$disconnect();
    process.exit(1);
  });