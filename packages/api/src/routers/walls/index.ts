import global from "@andescalada/api/schemas/global";
import wall from "@andescalada/api/schemas/wall";
import routeList from "@andescalada/api/src/routers/walls/routeList";
import error from "@andescalada/api/src/utils/errors";
import getMainTopo from "@andescalada/api/src/utils/getMainTopo";
import parseMultiPitch from "@andescalada/api/src/utils/parseMultiPitch";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { InfoAccess, SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../../createRouter";

const Route = {
  name: true,
  id: true,
  RouteGrade: true,
  position: true,
  kind: true,
  isDeleted: true,
  unknownName: true,
  wallId: true,
  Author: { select: { email: true } },
};

export const wallsRouter = t.router({
  all: t.procedure.query(({ ctx }) =>
    ctx.prisma.wall.findMany({
      orderBy: { position: "asc" },
    }),
  ),
  routeList: routeList,
  // Asset being downloaded
  byId: protectedZoneProcedure.input(wall.id).query(async ({ ctx, input }) => {
    const wall = await ctx.prisma.wall.findUnique({
      where: { id: input.wallId },
      include: includeInWallById,
    });

    if (!wall) {
      throw new TRPCError(error.wallNotFound(input.wallId));
    }

    if (
      !ctx.permissions.has("Read") &&
      wall.Sector.Zone.infoAccess !== InfoAccess.Public
    ) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Read"),
      );
    }

    const parsedMultiPitch = parseMultiPitch(wall.MultiPitch);

    const parsedWall = { ...wall, MultiPitch: parsedMultiPitch };
    return parsedWall;
  }),

  add: protectedZoneProcedure
    .input(z.object({ sectorId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("Create")) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const result = await ctx.prisma.wall.aggregate({
        _max: { position: true },
      });
      const biggestPosition = result._max.position || 0;

      const newWall = await ctx.prisma.wall.create({
        data: {
          name: input.name,
          slug: slug(input.name),
          Sector: { connect: { id: input.sectorId } },
          position: biggestPosition + 1,
          Author: { connect: { email: ctx.user.email } },
        },
      });

      await ctx.prisma.sector.update({
        where: { id: input.sectorId },
        data: { version: { increment: 1 } },
      });
      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      return newWall;
    }),
  allRoutes: t.procedure
    .input(z.object({ wallId: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.wall.findUnique({
        where: { id: input.wallId },
        select: {
          routes: {
            select: { name: true, id: true, position: true, RouteGrade: true },
          },
        },
      });
      if (!res)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No routes found for wall  with id '${input.wallId}'`,
        });
      return res.routes;
    }),
  edit: protectedZoneProcedure
    .input(wall.schema.merge(z.object({ wallId: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const wallToUpdate = await ctx.prisma.wall.findUnique({
        where: { id: input.wallId },
        select: { Author: { select: { email: true } } },
      });
      if (
        !ctx.permissions.has("Update") &&
        wallToUpdate?.Author.email !== ctx.user.email
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const wall = await ctx.prisma.wall.update({
        where: { id: input.wallId },
        data: {
          name: input.name,
          slug: slug(input.name),
          version: { increment: 1 },
        },
      });
      await ctx.prisma.sector.update({
        where: { id: wall.sectorId },
        data: { version: { increment: 1 } },
      });
      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });
      return wall;
    }),
  delete: protectedZoneProcedure
    .input(
      wall.schema.omit({ name: true }).merge(global.isDeleted).merge(wall.id),
    )
    .mutation(async ({ ctx, input }) => {
      const route = await ctx.prisma.wall.findUnique({
        where: { id: input.wallId },
        select: { Author: { select: { email: true } } },
      });
      if (
        !ctx.permissions.has("Update") &&
        route?.Author.email !== ctx.user.email
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const wall = await ctx.prisma.wall.update({
        where: { id: input.wallId },
        data: { isDeleted: input.isDeleted },
      });

      await ctx.prisma.sector.update({
        where: { id: wall.sectorId },
        data: { version: { increment: 1 } },
      });
      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      return wall;
    }),
  mainTopo: protectedZoneProcedure
    .input(wall.id)
    .query(async ({ ctx, input }) => {
      if (!ctx.permissions.has("Read")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "Read"),
        );
      }
      return getMainTopo({ ctx, wallId: input.wallId });
    }),
});

const routesQuery = {
  orderBy: { position: "asc" as const },
  where: {
    isDeleted: { equals: SoftDelete.NotDeleted },
    extendedRouteId: { equals: null },
    Pitch: { is: null },
  },
  select: {
    ...Route,
    Pitch: {
      include: { MultiPitch: { select: { name: true, id: true } } },
    },
    Extension: {
      where: { isDeleted: SoftDelete.NotDeleted },
      select: Route,
    },
  },
};

export const includeInWallById = {
  Sector: {
    select: {
      zoneId: true,
      sectorKind: true,
      Zone: { select: { infoAccess: true } },
    },
  },
  routes: routesQuery,
  MultiPitch: {
    where: { isDeleted: SoftDelete.NotDeleted },
    select: {
      id: true,
      name: true,
      position: true,
      Author: { select: { email: true } },
      wallId: true,
      Pitches: {
        where: { isDeleted: SoftDelete.NotDeleted },
        select: { Route: { select: { RouteGrade: true, kind: true } } },
      },
    },
  },
  topos: {
    where: { main: true, isDeleted: SoftDelete.NotDeleted },
    take: 1,
    select: {
      id: true,
      image: true,
      name: true,
      routeStrokeWidth: true,
    },
  },
};
