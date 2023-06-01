import { t } from "@andescalada/api/src/createRouter";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { z } from "zod";

export const syncRouter = t.router({
  pull: protectedProcedure
    .input(
      z.object({
        lastPulledAt: z.date(),
        tables: z.array(z.string()),
        schemaVersion: z.number(),
        migration: z
          .object({
            from: z.number().int(),
            tables: z.array(z.string()),
            columns: z.array(
              z.object({ table: z.string(), columns: z.array(z.string()) }),
            ),
          })
          .nullable(),
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
          const updated = await prisma.$queryRawUnsafe<object[]>(
            `SELECT * FROM ${table} WHERE updatedAt > ? AND isDeleted = ? AND createdAt < ? AND userId = ?`,
            lastPulledAt,
            "NotDeleted",
            lastPulledAt,
            user.id,
          );
          const created = await prisma.$queryRawUnsafe<object[]>(
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
            changes.reduce<{
              [table: string]: {
                created: object[];
                updated: object[];
                deleted: string[];
              };
            }>((acc, change) => ({ ...acc, ...change }), {}),
          )
          .catch(() => ({}));

        return { changes, timestamp: new Date().getTime() };
      },
    ),
  push: protectedProcedure
    .input(z.object({ changes: z.object({}), lastPulledAt: z.date() }))
    .mutation(({}) => {
      return true;
    }),
});
