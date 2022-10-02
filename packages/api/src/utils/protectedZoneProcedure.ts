import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { PermissionActions } from "@prisma/client";
import { deserialize } from "superjson";
import type { SuperJSONResult } from "superjson/src/types";
import { z } from "zod";

type Actions = Set<PermissionActions>;

type Permissions = { permissions: Actions };

export const protectedZoneProcedure = protectedProcedure
  .input(z.object({ zoneId: z.string() }))
  .use(async ({ ctx, next, input }) => {
    const res = await ctx.access.get<SuperJSONResult>(
      `${ctx.user.email}:${input.zoneId}`,
    );
    let permissions: Actions = new Set();
    if (res) {
      const des = deserialize<Permissions>(res);
      permissions = des.permissions;
    }

    return next({
      ctx: { ...ctx, permissions },
    });
  });
