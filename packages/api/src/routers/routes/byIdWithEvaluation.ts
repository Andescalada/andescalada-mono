import route from "@andescalada/api/schemas/route";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { InfoAccess } from "@prisma/client";
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
        RouteGrade: true,
        Wall: {
          select: {
            name: true,
            id: true,
            topos: { where: { main: true }, take: 1, include: { image: true } },
            Sector: { select: { name: true, zoneId: true, id: true } },
          },
        },
      },
    });

    const getEvaluationAverage = ctx.prisma.routeEvaluation.aggregate({
      where: { routeId: input.routeId },
      _avg: { evaluation: true },
      _count: { evaluation: true },
    });

    const [route, evaluationAverage] = await ctx.prisma.$transaction([
      findRoute,
      getEvaluationAverage,
    ]);

    return {
      ...route,
      mainTopo: route.Wall.topos[0],
      evaluation: {
        average: evaluationAverage._avg.evaluation
          ? Number(evaluationAverage._avg.evaluation)
          : 0,
        count: evaluationAverage._count.evaluation,
      },
    };
  });

export default byIdWithEvaluation;
