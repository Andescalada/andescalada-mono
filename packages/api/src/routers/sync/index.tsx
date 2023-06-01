import { t } from "@andescalada/api/src/createRouter";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { z } from "zod";

export const syncRouter = t.router({
  pull: protectedProcedure
    .input(
      z.object({
        lastPulledAt: z.date(),
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
      ({
        ctx: { prisma },
        input: { lastPulledAt, migration, schemaVersion },
      }) => {
        if (!migration) return;

        const { tables } = migration;
        tables.forEach((table) => {
          prisma.
        });
        return { changes: {}, timestamp: new Date().getTime() };
      },
    ),
  push: protectedProcedure
    .input(z.object({ changes: z.object({}), lastPulledAt: z.date() }))
    .mutation(({}) => {
      return true;
    }),
});
