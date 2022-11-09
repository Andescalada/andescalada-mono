import { TRPCError } from "@trpc/server";

import { t } from "../createRouter";

const isAuth = t.middleware(async ({ ctx, next }) => {
  const { user, verified } = ctx;
  if (verified === false) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!user || !verified) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to fetch user",
    });
  }

  return next({
    ctx: { ...ctx, user },
  });
});

export const protectedProcedure = t.procedure.use(isAuth);
