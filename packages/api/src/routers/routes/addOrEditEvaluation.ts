import route from "@andescalada/api/schemas/route";
import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const addOrEditEvaluation = protectedProcedure
  .input(
    route.routeId.extend({
      evaluation: z.number().min(0).max(5),
      id: z.string().uuid().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { email: ctx.user.email },
      select: {
        id: true,
        RouteEvaluation: { where: { routeId: input.routeId } },
      },
    });

    if (!user) {
      throw new TRPCError(error.notFound("User", ctx.user.email));
    }

    if (!user.RouteEvaluation.length) {
      return ctx.prisma.routeEvaluation.create({
        data: {
          ...(input.id && { id: input.id }),
          routeId: input.routeId,
          userId: user.id,
          evaluation: input.evaluation,
        },
      });
    }

    return ctx.prisma.routeEvaluation.update({
      where: { id: user.RouteEvaluation[0].id },
      data: { evaluation: input.evaluation },
    });
  });

export default addOrEditEvaluation;
