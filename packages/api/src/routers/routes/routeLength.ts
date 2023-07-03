import route from "@andescalada/api/schemas/route";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { UnitSchema } from "@andescalada/db/zod";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const addRouteLength = protectedZoneProcedure
  .input(route.routeId.extend({ routeLength: z.number().max(1000).min(0) }))
  .mutation(async ({ ctx, input }) => {
    if (!ctx.permissions.has("Create")) {
    }

    const createLength = ctx.prisma.routeLength.create({
      data: {
        Route: { connect: { id: input.routeId } },
        length: input.routeLength,
        unit: UnitSchema.Enum.Metric,
      },
    });

    const updateRoute = ctx.prisma.route.update({
      where: { id: input.routeId },
      data: { version: { increment: 1 } },
    });

    const [length] = await ctx.prisma.$transaction([createLength, updateRoute]);

    return length;
  });

const editRouteLength = protectedZoneProcedure
  .input(route.routeId.extend({ routeLength: z.number().max(1000).min(0) }))
  .mutation(async ({ ctx, input }) => {
    const route = await ctx.prisma.route.findUniqueOrThrow({
      where: { id: input.routeId },
      select: { Author: { select: { id: true } } },
    });

    if (!ctx.permissions.has("Update") && ctx.user.id !== route.Author.id) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Update"),
      );
    }

    const createLength = ctx.prisma.routeLength.update({
      where: { routeId: input.routeId },
      data: {
        length: input.routeLength,
        unit: UnitSchema.Enum.Metric,
      },
    });

    const updateRoute = ctx.prisma.route.update({
      where: { id: input.routeId },
      data: { version: { increment: 1 } },
    });

    const [length] = await ctx.prisma.$transaction([createLength, updateRoute]);

    return length;
  });

export { addRouteLength, editRouteLength };
