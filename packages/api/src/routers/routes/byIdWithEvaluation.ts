import route from "@andescalada/api/schemas/route";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { InfoAccess, SoftDelete } from "@andescalada/db";
import { TRPCError } from "@trpc/server";

const byIdWithEvaluation = protectedZoneProcedure
  .input(route.routeId)
  .query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUniqueOrThrow({
      where: { id: input.zoneId },
    });

    if (zone.infoAccess !== InfoAccess.Public && !ctx.permissions.has("Read")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Read"),
      );
    }
    const findRoute = ctx.prisma.route.findUniqueOrThrow({
      where: { id: input.routeId },
      include: {
        ...includeInRoute,
        RouteEvaluation: { where: { User: { id: ctx.user.id } } },
      },
    });

    const getEvaluationAverage = ctx.prisma.routeEvaluation.aggregate({
      where: { routeId: input.routeId },
      _avg: { evaluation: true },
      _count: { evaluation: true },
    });

    const getGradeEvaluationAverage = ctx.prisma.routeGradeEvaluation.aggregate(
      {
        where: { routeId: input.routeId },
        _avg: { evaluation: true },
        _count: { evaluation: true },
      },
    );

    const [route, evaluationAverage, gradeEvaluationAverage] =
      await ctx.prisma.$transaction([
        findRoute,
        getEvaluationAverage,
        getGradeEvaluationAverage,
      ]);

    return {
      ...route,
      mainTopo: route.Wall.topos[0],
      description: route.description?.originalText,
      length: route.RouteLength?.length
        ? Number(route.RouteLength.length)
        : null,
      evaluation: {
        average: evaluationAverage._avg.evaluation
          ? Math.round(Number(evaluationAverage._avg.evaluation))
          : 0,
        count: evaluationAverage._count.evaluation,
      },
      userEvaluation: route.RouteEvaluation[0]?.evaluation
        ? Number(route.RouteEvaluation[0]?.evaluation)
        : 0,
      gradeEvaluation: {
        average: gradeEvaluationAverage._avg.evaluation
          ? Number(gradeEvaluationAverage._avg.evaluation)
          : null,
        count: gradeEvaluationAverage._count.evaluation,
      },
    };
  });

export default byIdWithEvaluation;

export const includeInRoute = {
  description: true,
  RouteLength: true,
  RouteGrade: true,
  RouteAlert: {
    where: {
      OR: [{ dueDate: null }, { dueDate: { gte: new Date() } }],
      dismissedDate: null,
      isDeleted: SoftDelete.NotDeleted,
    },
    include: {
      title: { select: { originalText: true } },
      description: { select: { originalText: true } },
    },
  },
  Wall: {
    select: {
      name: true,
      id: true,
      topos: { where: { main: true }, take: 1, include: { image: true } },
      Sector: { select: { name: true, zoneId: true, id: true } },
    },
  },
};
