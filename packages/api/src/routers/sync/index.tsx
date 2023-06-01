import { t } from "@andescalada/api/src/createRouter";
import {
  ProtectedContext,
  protectedProcedure,
} from "@andescalada/api/src/utils/protectedProcedure";
import { Table } from "@andescalada/utils/local-database";
import { Prisma, SoftDelete } from "@prisma/client";
import { z } from "zod";

const TableChanges = z.object({
  created: z.array(z.record(z.any())),
  updated: z.array(z.record(z.any())),
  deleted: z.array(z.string()),
});

type TableChanges = z.infer<typeof TableChanges>;

const Changes = z.record(z.nativeEnum(Table), TableChanges);

type Changes = z.infer<typeof Changes>;

type PrismaMutationChangesParams = {
  ctx: ProtectedContext;
  changes: TableChanges;
};

export const syncRouter = t.router({
  pull: protectedProcedure
    .input(
      z.object({
        lastPulledAt: z.date(),
        tables: z.array(z.nativeEnum(Table)),
      }),
    )
    .query(
      async ({
        ctx: {
          prisma,
          user: { email },
        },
        input: { lastPulledAt, tables },
      }) => {
        const user = await prisma.user.findUniqueOrThrow({ where: { email } });
        const queries = tables.map(async (table) => {
          const updated = await prisma.$queryRawUnsafe<Record<string, any>[]>(
            `SELECT * FROM ${table} WHERE updatedAt > ? AND isDeleted = ? AND createdAt < ? AND userId = ?`,
            lastPulledAt,
            "NotDeleted",
            lastPulledAt,
            user.id,
          );
          const created = await prisma.$queryRawUnsafe<Record<string, any>[]>(
            `SELECT * FROM ${table} WHERE createdAt > ? AND isDeleted = ? AND userId = ?`,
            lastPulledAt,
            "NotDeleted",
            user.id,
          );
          const deleted = await prisma
            .$queryRawUnsafe<{ id: string }[]>(
              `SELECT id FROM ${table} WHERE updatedAt > ? AND isDeleted != ? AND userId = ?`,
              lastPulledAt,
              "NotDeleted",
              user.id,
            )
            .then((routes) => routes.map((route) => route.id));
          return { table: { updated, created, deleted } };
        });

        const changes = await Promise.all(queries)
          .then((changes) =>
            changes.reduce<Changes>(
              (acc, change) => ({ ...acc, ...change }),
              {},
            ),
          )
          .catch(() => ({}));

        return { changes, timestamp: new Date().getTime() };
      },
    ),
  push: protectedProcedure
    .input(z.object({ changes: Changes, lastPulledAt: z.date() }))
    .mutation(async ({ ctx, input: { changes } }) => {
      const mutations: Prisma.PrismaPromise<any>[] = [];

      Object.entries(changes).forEach(async ([t, changes]) => {
        const table = t as Table;
        if (table === Table.ROUTE_EVALUATION) {
          const routeEvaluationMutations = pushRouteEvaluation({
            ctx,
            changes,
          });
          mutations.push(...routeEvaluationMutations);
        }
      });

      await ctx.prisma.$transaction(mutations);

      return true;
    }),
});

const pushRouteEvaluation = ({
  ctx: { prisma },
  changes: { created, deleted, updated },
}: PrismaMutationChangesParams) => {
  const mutations: Prisma.PrismaPromise<any>[] = [];
  if (created.length === 0) {
    const create = prisma.routeEvaluation.createMany({
      data: created as Prisma.RouteEvaluationCreateManyInput[],
    });
    mutations.push(create);
  }
  if (updated.length === 0) {
    const updates = updated.map(({ id, ...rest }) =>
      prisma.routeEvaluation.update({
        where: { id },
        data: rest as Prisma.RouteEvaluationUpdateInput,
      }),
    );
    mutations.push(...updates);
  }
  if (deleted.length === 0) {
    const deletes = prisma.routeEvaluation.updateMany({
      where: { id: { in: deleted } },
      data: { isDeleted: SoftDelete.DeletedDev },
    });
    mutations.push(deletes);
  }
  return mutations;
};
