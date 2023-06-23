import { t } from "@andescalada/api/src/createRouter";
import { pushRouteEvaluation } from "@andescalada/api/src/routers/sync/pushRouteEvaluation";
import { pushRouteGradeEvaluation } from "@andescalada/api/src/routers/sync/pushRouteGradeEvaluation";
import { TableChanges } from "@andescalada/api/src/routers/sync/types";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { Prisma } from "@andescalada/db";
import { Table } from "@andescalada/utils/local-database";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const Changes = z.record(z.nativeEnum(Table), TableChanges);

type Changes = z.infer<typeof Changes>;

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
          const updated = await prisma
            .$queryRawUnsafe<Record<string, any>[]>(
              `SELECT * FROM ${table} WHERE updatedAt > ? AND isDeleted = ? AND createdAt < ? AND userId = ?`,
              lastPulledAt,
              "NotDeleted",
              lastPulledAt,
              user.id,
            )
            .then((items) => parseToLocalDb(items, table));
          const created = await prisma
            .$queryRawUnsafe<Record<string, any>[]>(
              `SELECT * FROM ${table} WHERE createdAt > ? AND isDeleted = ? AND userId = ?`,
              lastPulledAt,
              "NotDeleted",
              user.id,
            )
            .then((items) => parseToLocalDb(items, table));
          const deleted = await prisma
            .$queryRawUnsafe<{ id: string }[]>(
              `SELECT id FROM ${table} WHERE updatedAt > ? AND isDeleted != ? AND userId = ?`,
              lastPulledAt,
              "NotDeleted",
              user.id,
            )
            .then((items) => items.map((item) => item.id));
          return { [table]: { updated, created, deleted } };
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

      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { email: ctx.user.email },
      });

      Object.entries(changes).forEach(async ([t, changes]) => {
        const table = t as Table;
        if (table === Table.ROUTE_EVALUATION) {
          const routeEvaluationMutations = pushRouteEvaluation({
            ctx,
            changes,
            user,
          });
          mutations.push(...routeEvaluationMutations);
        }
        if (table === Table.ROUTE_GRADE_EVALUATION) {
          const routeGradeEvaluationMutations = pushRouteGradeEvaluation({
            ctx,
            changes,
            user,
          });
          mutations.push(...routeGradeEvaluationMutations);
        }
      });

      try {
        await ctx.prisma.$transaction(mutations);
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unable to save migration data",
          cause: error,
        });
      }

      return true;
    }),
});

const parseToLocalDb = (items: Record<string, any>[], table: Table) =>
  items.map((item) => {
    item.created_at = item.createdAt;
    item.updated_at = item.updatedAt;
    delete item.createdAt;
    delete item.updatedAt;
    delete item.isDeleted;
    if (table === Table.ROUTE_EVALUATION) {
      if ("evaluation" in item) {
        item.evaluation = String(item.evaluation);
      }
    }
    return item;
  });
