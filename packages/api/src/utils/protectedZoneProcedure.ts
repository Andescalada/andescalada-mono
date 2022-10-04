import { Access, Permissions } from "@andescalada/api/src/types/permissions";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { deserialize } from "superjson";
import { z } from "zod";

export const protectedZoneProcedure = protectedProcedure
  .input(z.object({ zoneId: z.string() }))
  .use(async ({ ctx, next, input }) => {
    const res = await ctx.access.hget<Access>(ctx.user.email, input.zoneId);
    let permissions: Permissions = new Set();
    if (res) {
      permissions = deserialize<Permissions>(res);
    }

    return next({
      ctx: { ...ctx, permissions },
    });
  });
