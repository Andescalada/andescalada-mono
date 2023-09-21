import { PrismaMutationChangesParams } from "@andescalada/api/src/routers/sync/types";
import { Prisma, SoftDelete } from "@andescalada/db";

export const pushRouteAlert = ({
  ctx: { prisma, user },
  changes: { created, deleted, updated },
}: PrismaMutationChangesParams) => {
  const mutations: Prisma.PrismaPromise<any>[] = [];

  if (created.length > 0) {
    const cleanCreated = created.map((c) => {
      const createAlert = prisma.routeAlert.create({
        data: {
          id: c.id,
          createdAt: new Date(c.created_at),
          updatedAt: new Date(c.updated_at),
          Route: { connect: { id: c.routeId } },
          Author: { connect: { id: user.id } },
          title: {
            create: {
              originalText: c.title,
              originalLang: { connect: { languageId: "es" } },
            },
          },
          ...(c.description && {
            description: {
              create: {
                originalText: c.description,
                originalLang: { connect: { languageId: "es" } },
              },
            },
          }),
          kind: c.kind,
          severity: c.severity,
          dueDate: new Date(c.dueDate),
        },
      });
      const updateRouteVersion = prisma.route.update({
        where: { id: c.routeId },
        data: { version: { increment: 1 } },
      });
      return [createAlert, updateRouteVersion];
    });
    mutations.push(...cleanCreated.flat());
  }
  if (updated.length > 0) {
    const updates = updated.map(({ id, ...c }) => {
      const data: Prisma.RouteAlertUpdateInput = {
        Route: { connect: { id: c.routeId } },
        id: c.id,
        title: {
          update: {
            originalText: c.description,
          },
        },
        ...(c.description && {
          description: {
            upsert: {
              originalText: c.description,
              originalLang: { connect: { languageId: "es" } },
            },
          },
        }),
        kind: c.kind,
        severity: c.severity,
        dueDate: new Date(c.dueDate),
      };

      return prisma.routeAlert.update({
        where: { id },
        data,
      });
    });
    mutations.push(...updates);
  }
  if (deleted.length > 0) {
    const deletes = prisma.routeAlert.updateMany({
      where: { id: { in: deleted } },
      data: { isDeleted: SoftDelete.DeletedDev },
    });
    mutations.push(deletes);
  }
  return mutations;
};
