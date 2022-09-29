import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      session: { user: ctx.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

export const protectedZoneProcedure = protectedProcedure
  .input(z.object({ zoneId: z.string() }))
  .use(async ({ ctx, next, input }) => {
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
    });
    if (!zone) throw new TRPCError({ code: "NOT_FOUND" });
    if (zone.infoAccess === "Public") return next({ ctx: { ...ctx, zone } });
    return next();
  });
