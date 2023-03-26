import { Access, Permissions } from "@andescalada/api/src/types/permissions";
import getAndParsePermissions from "@andescalada/api/src/utils/getAndParsePermissions";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { deserialize } from "superjson";
import { z } from "zod";

export const protectedZoneProcedure = protectedProcedure
  .input(z.object({ zoneId: z.string() }))
  .use(async ({ ctx, next, input }) => {
    let permissions: Permissions = new Set();
    try {
      const res = await ctx.access.hget<Access>(ctx.user.email, input.zoneId);
      if (res) {
        permissions = deserialize<Permissions>(res);
      } else {
        throw new Error("No res from Upstash");
      }
    } catch (err) {
      permissions = await getAndParsePermissions(ctx, input.zoneId);
    }

    return next({
      ctx: { ...ctx, permissions },
    });
  });
