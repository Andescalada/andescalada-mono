import route from "@andescalada/api/schemas/route";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { z } from "zod";

const addEvaluation = protectedProcedure
  .input(route.routeId.extend({ evaluation: z.number().min(0).max(5) }))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.routeEvaluation.create({
      data: {
        Route: { connect: { id: input.routeId } },
        User: { connect: { id: ctx.user.email } },
        evaluation: input.evaluation,
      },
    });
  });

export default addEvaluation;
