import { t } from "@andescalada/api/src/createRouter";
import { pushRouteAlert } from "@andescalada/api/src/routers/sync/pushRouteAlert";
import { pushRouteEvaluation } from "@andescalada/api/src/routers/sync/pushRouteEvaluation";
import { pushRouteGradeEvaluation } from "@andescalada/api/src/routers/sync/pushRouteGradeEvaluation";
import { pushUser } from "@andescalada/api/src/routers/sync/pushUser";
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
      async ({ ctx: { prisma, user }, input: { lastPulledAt, tables } }) => {
        const queries = tables.map(async (table) => {
          const updated = await prisma
            .$queryRawUnsafe<Record<string, any>[]>(
              `SELECT * FROM ${table} WHERE updatedAt > ? AND isDeleted = ? AND createdAt < ? AND ${
                table === Table.USER ? "id" : "userId"
              } = ?`,
              lastPulledAt,
              "NotDeleted",
              lastPulledAt,
              user.id,
            )
            .then((items) => parseToLocalDb(items, table));
          const created = await prisma
            .$queryRawUnsafe<Record<string, any>[]>(
              `SELECT * FROM ${table} WHERE createdAt > ? AND isDeleted = ? AND ${
                table === Table.USER ? "id" : "userId"
              } = ?`,
              lastPulledAt,
              "NotDeleted",
              user.id,
            )
            .then((items) => parseToLocalDb(items, table));

          const deleted = await prisma
            .$queryRawUnsafe<{ id: string }[]>(
              `SELECT id FROM ${table} WHERE updatedAt > ? AND isDeleted != ? AND ${
                table === Table.USER ? "id" : "userId"
              } = ?`,
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

      Object.entries(changes).forEach(async ([t, changes]) => {
        const table = t as Table;
        if (table === Table.ROUTE_ALERT) {
          const routeAlertMutations = pushRouteAlert({
            ctx,
            changes,
          });
          mutations.push(...routeAlertMutations);
        }
        if (table === Table.ROUTE_EVALUATION) {
          const routeEvaluationMutations = pushRouteEvaluation({
            ctx,
            changes,
          });
          mutations.push(...routeEvaluationMutations);
        }
        if (table === Table.ROUTE_GRADE_EVALUATION) {
          const routeGradeEvaluationMutations = pushRouteGradeEvaluation({
            ctx,
            changes,
          });
          mutations.push(...routeGradeEvaluationMutations);
        }
        if (table === Table.USER) {
          const userMutations = pushUser({
            ctx,
            changes,
          });
          mutations.push(...userMutations);
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
    if (table === Table.USER) {
      item.ownUser = true;
    }
    return item;
  });
