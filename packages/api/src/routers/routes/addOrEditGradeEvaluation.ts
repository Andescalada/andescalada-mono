import route from "@andescalada/api/schemas/route";
import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { GradeSystemsSchema } from "@andescalada/db/zod";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const addOrEditGradeEvaluation = protectedProcedure
  .input(
    route.routeId.extend({
      evaluation: z.number().int(),
      originalGradeSystem: GradeSystemsSchema,
      originalGrade: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
      select: {
        id: true,
        RouteGradeEvaluation: { where: { routeId: input.routeId } },
      },
    });

    if (!user) {
      throw new TRPCError(error.notFound("User", ctx.user.id));
    }

    if (!user.RouteGradeEvaluation.length) {
      return ctx.prisma.routeGradeEvaluation.create({
        data: {
          routeId: input.routeId,
          userId: user.id,
          evaluation: input.evaluation,
          originalGradeSystem: input.originalGradeSystem,
          originalGrade: input.originalGrade,
        },
      });
    }

    return ctx.prisma.routeGradeEvaluation.update({
      where: { id: user.RouteGradeEvaluation[0].id },
      data: {
        evaluation: input.evaluation,
        originalGradeSystem: input.originalGradeSystem,
        originalGrade: input.originalGrade,
      },
    });
  });

export default addOrEditGradeEvaluation;
