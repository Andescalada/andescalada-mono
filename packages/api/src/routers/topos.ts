import topo from "@andescalada/api/schemas/topo";
import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const toposRouter = t.router({
  // Asset being downloaded
  byId: protectedZoneProcedure.input(topo.id).query(async ({ ctx, input }) => {
    const topo = await ctx.prisma.topo.findUnique({
      where: { id: input.topoId },
      include: {
        RoutePath: {
          where: { Route: { isDeleted: SoftDelete.NotDeleted } },
          include: {
            Route: {
              select: {
                id: true,
                position: true,
                extendedRouteId: true,
                kind: true,
                name: true,
                RouteGrade: true,
              },
            },
          },
        },
        image: {
          select: { url: true, height: true, width: true, publicId: true },
        },
      },
    });
    if (!topo) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No topo with id '${input}'`,
      });
    }
    return topo;
  }),
  add: protectedProcedure.input(topo.schema).mutation(({ ctx, input }) =>
    ctx.prisma.topo.create({
      data: {
        main: input.main,
        name: input.name,
        slug: slug(input.name),
        Wall: { connect: { id: input.wallId } },
        image: {
          create: input.image,
        },
        Author: { connect: { email: ctx.user.email } },
      },
    }),
  ),
  modifyStrokeWidth: protectedZoneProcedure
    .input(topo.id.merge(z.object({ routeStrokeWidth: z.number() })))
    .mutation(({ ctx, input }) => {
      if (!ctx.permissions.has("Update")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "Update"),
        );
      }
      return ctx.prisma.topo.update({
        where: { id: input.topoId },
        data: { routeStrokeWidth: input.routeStrokeWidth },
      });
    }),
});
