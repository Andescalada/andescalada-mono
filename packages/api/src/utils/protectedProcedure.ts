import { TRPCError } from "@trpc/server";

import { t } from "../createRouter";

const isAuth = t.middleware(async ({ ctx, next }) => {
  const { user } = ctx;
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: { ...ctx, user },
  });
});

export const protectedProcedure = t.procedure.use(isAuth);
