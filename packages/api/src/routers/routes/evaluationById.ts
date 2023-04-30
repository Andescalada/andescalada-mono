import route from "@andescalada/api/schemas/route";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";

const evaluationById = protectedProcedure
  .input(route.routeId)
  .query(async ({ ctx, input }) => {
    const res = await ctx.prisma.routeEvaluation.findFirst({
      where: {
        routeId: input.routeId,
        User: { email: ctx.user.email },
      },
    });

    return { value: res?.evaluation ? Number(res?.evaluation) : 0 };
  });

export default evaluationById;
