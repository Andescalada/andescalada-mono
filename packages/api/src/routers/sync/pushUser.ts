import { PrismaMutationChangesParams } from "@andescalada/api/src/routers/sync/types";
import { Prisma } from "@andescalada/db";
import { GradeSystemsSchema } from "@andescalada/db/zod";

const parseGradingSystem = (gradingSystem: string) => {
  const e = GradeSystemsSchema.parse(gradingSystem);
  return GradeSystemsSchema.Enum[e];
};

export const pushUser = ({
  ctx: { prisma },
  changes: { updated },
}: Omit<PrismaMutationChangesParams, "user">) => {
  const mutations: Prisma.PrismaPromise<any>[] = [];
  if (updated.length > 0) {
    const updates = updated.map(({ id, ...rest }) => {
      const data: Prisma.UserUpdateInput = {
        preferredBoulderGrade: parseGradingSystem(rest.preferredBoulderGrade),
        preferredSportGrade: parseGradingSystem(rest.preferredSportGrade),
        preferredTradGrade: parseGradingSystem(rest.preferredTradGrade),
      };
      return prisma.user.update({
        where: { id },
        data,
      });
    });
    mutations.push(...updates);
  }

  return mutations;
};
