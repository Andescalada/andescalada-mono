import { PrismaMutationChangesParams } from "@andescalada/api/src/routers/sync/types";
import { Prisma, SoftDelete } from "@andescalada/db";

export const pushRouteEvaluation = ({
  ctx: { prisma },
  changes: { created, deleted, updated },
  user,
}: PrismaMutationChangesParams) => {
  const mutations: Prisma.PrismaPromise<any>[] = [];

  if (created.length > 0) {
    const cleanCreated = created.map<Prisma.RouteEvaluationCreateManyInput>(
      (c) => {
        return {
          evaluation: c.evaluation,
          routeId: c.routeId,
          userId: user.id,
          createdAt: new Date(c.created_at),
          updatedAt: new Date(c.updated_at),
          id: c.id,
        };
      },
    );
    const create = prisma.routeEvaluation.createMany({
      data: cleanCreated,
    });
    mutations.push(create);
  }
  if (updated.length > 0) {
    const updates = updated.map(({ id, ...rest }) => {
      const data: Prisma.RouteEvaluationUpdateInput = {
        evaluation: rest.evaluation,
        Route: { connect: { id: rest.routeId } },
        User: { connect: { id: user.id } },
      };
      return prisma.routeEvaluation.update({
        where: { id },
        data,
      });
    });
    mutations.push(...updates);
  }
  if (deleted.length > 0) {
    const deletes = prisma.routeEvaluation.updateMany({
      where: { id: { in: deleted } },
      data: { isDeleted: SoftDelete.DeletedDev },
    });
    mutations.push(deletes);
  }
  return mutations;
};
