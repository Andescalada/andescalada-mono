import { PrismaMutationChangesParams } from "@andescalada/api/src/routers/sync/types";
import { Prisma, SoftDelete } from "@andescalada/db";
import { GradeSystemsSchema } from "@andescalada/db/zod";

export const pushRouteGradeEvaluation = ({
  ctx: { prisma, user },
  changes: { created, deleted, updated },
}: PrismaMutationChangesParams) => {
  const mutations: Prisma.PrismaPromise<any>[] = [];

  if (created.length > 0) {
    const cleanCreated =
      created.map<Prisma.RouteGradeEvaluationCreateManyInput>((c) => {
        return {
          evaluation: c.evaluation,
          originalGradeSystem: GradeSystemsSchema.parse(
            JSON.parse(c.originalGradeSystem),
          ),
          originalGrade: c.originalGrade,
          routeId: c.routeId,
          userId: user.id,
          createdAt: new Date(c.created_at),
          updatedAt: new Date(c.updated_at),
          id: c.id,
        };
      });
    const create = prisma.routeGradeEvaluation.createMany({
      data: cleanCreated,
    });
    mutations.push(create);
  }
  if (updated.length > 0) {
    const updates = updated.map(({ id, ...rest }) => {
      const data: Prisma.RouteGradeEvaluationUpdateInput = {
        evaluation: rest.evaluation,
        originalGradeSystem: GradeSystemsSchema.parse(
          JSON.parse(rest.originalGradeSystem),
        ),
        originalGrade: rest.originalGrade,
        Route: { connect: { id: rest.routeId } },
        User: { connect: { id: user.id } },
      };
      return prisma.routeGradeEvaluation.update({
        where: { id },
        data,
      });
    });
    mutations.push(...updates);
  }
  if (deleted.length > 0) {
    const deletes = prisma.routeGradeEvaluation.updateMany({
      where: { id: { in: deleted } },
      data: { isDeleted: SoftDelete.DeletedDev },
    });
    mutations.push(deletes);
  }
  return mutations;
};
