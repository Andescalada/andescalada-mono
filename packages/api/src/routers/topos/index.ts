import topo from "@andescalada/api/schemas/topo";
import { t } from "@andescalada/api/src/createRouter";
import { create } from "@andescalada/api/src/routers/topos/create";
import {
  otherTopos,
  otherToposCount,
} from "@andescalada/api/src/routers/topos/otherTopos";
import {
  deleteTopoByUser,
  toposByUser,
  toposByUserCount,
} from "@andescalada/api/src/routers/topos/toposByUser";
import {
  approveTopo,
  numberOfToposToVerify,
  rejectTopo,
  toposToVerify,
} from "@andescalada/api/src/routers/topos/topoVerification";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete, VerificationStatus } from "@andescalada/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { setMainTopo } from "./setMainTopo";

export const toposRouter = t.router({
  toposToVerify: toposToVerify,
  approveTopo: approveTopo,
  rejectTopo: rejectTopo,
  numberOfToposToVerify: numberOfToposToVerify,
  otherTopos: otherTopos,
  otherToposCount: otherToposCount,
  setMainTopo: setMainTopo,
  create: create,
  toposByUser: toposByUser,
  toposByUserCount: toposByUserCount,
  deleteTopoByUser: deleteTopoByUser,
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
  add: protectedZoneProcedure.input(topo.schema).mutation(({ ctx, input }) => {
    if (!ctx.permissions.has("Create")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Create"),
      );
    }
    return ctx.prisma.topo.create({
      data: {
        main: input.main,
        name: input.name,
        slug: slug(input.name),
        Wall: { connect: { id: input.wallId } },
        image: {
          create: input.image,
        },
        Author: { connect: { id: ctx.user.id } },
        Verification: {
          create: {
            status: VerificationStatus.Approved,
            VerifierUser: { connect: { id: ctx.user.id } },
          },
        },
      },
    });
  }),
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
        currentTopo.Author.id !== ctx.user.id
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
            currentTopo.Author.id === ctx.user.id
              ? undefined
              : { connect: { id: ctx.user.id } },
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
          variantRouteId: true,
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
