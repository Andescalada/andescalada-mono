import { ProtectedContext } from "@andescalada/api/src/utils/protectedProcedure";
import { User } from "@andescalada/db";
import { z } from "zod";

export const TableChanges = z.object({
  created: z.array(z.record(z.any())),
  updated: z.array(z.record(z.any())),
  deleted: z.array(z.string()),
});

export type TableChanges = z.infer<typeof TableChanges>;

export type PrismaMutationChangesParams = {
  ctx: ProtectedContext;
  changes: TableChanges;
  user: User;
};
