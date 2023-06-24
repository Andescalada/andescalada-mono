import topo from "@andescalada/api/schemas/topo";
import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@andescalada/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const toposRouter = t.router({
  // Asset being downloaded
  byId: protectedZoneProcedure.input(topo.id).query(async ({ ctx, input }) => {
    const topo = await ctx.prisma.topo.findUnique({
      where: { id: input.topoId },
      include: includeInTopo,
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
  delete: protectedZoneProcedure
    .input(topo.id)
    .mutation(async ({ ctx, input }) => {
      const currentTopo = await ctx.prisma.topo.findUniqueOrThrow({
        where: { id: input.topoId },
        select: { Author: true },
      });

      if (
        !ctx.permissions.has("Delete") &&
        currentTopo.Author.email !== ctx.user.email
      ) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "Delete"),
        );
      }

      return ctx.prisma.topo.update({
        where: { id: input.topoId },
        data: {
          isDeleted: SoftDelete.DeletedPublic,
          main: false,
          coAuthors:
            currentTopo.Author.email === ctx.user.email
              ? undefined
              : { connect: { email: ctx.user.email } },
        },
      });
    }),
});

export const includeInTopo = {
  Wall: {
    include: { Sector: true },
  },
  RoutePath: {
    where: {
      Route: {
        AND: [
          { isDeleted: SoftDelete.NotDeleted },
          {
            OR: [
              {
                Pitch: {
                  MultiPitch: {
                    isDeleted: SoftDelete.NotDeleted,
                  },
                },
              },

              { Pitch: null },
            ],
          },
          {
            OR: [
              {
                Pitch: { isDeleted: SoftDelete.NotDeleted },
              },
              { Pitch: null },
            ],
          },
        ],
      },
    },
    orderBy: { Route: { Pitch: { number: "desc" as const } } },
    include: {
      Route: {
        select: {
          id: true,
          position: true,
          extendedRouteId: true,
          kind: true,
          name: true,
          RouteGrade: true,
          Pitch: { select: { number: true } },
        },
      },
    },
  },
  image: {
    select: {
      id: true,
      url: true,
      height: true,
      width: true,
      publicId: true,
    },
  },
};
