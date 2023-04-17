import { InferContext } from "@andescalada/api/src/utils/inferContext";
import { TRPCError } from "@trpc/server";

import { t } from "../createRouter";

export const isAuth = t.middleware(async ({ ctx, next }) => {
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

export type ProtectedContext = InferContext<typeof isAuth>;
