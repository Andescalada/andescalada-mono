import zone from "@andescalada/api/schemas/zone";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const zonesRouter = t.router({
  all: t.procedure.query(({ ctx }) => ctx.prisma.zone.findMany()),
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({ where: { id: input } });
    if (!zone) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No zone with id '${input}'`,
      });
    }
    return zone;
  }),
  edit: t.procedure.input(zone.schema.merge(zone.id)).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { name: input.name },
      }),
  ),
  allSectors: protectedZoneProcedure.query(async ({ ctx, input }) => {
    const res = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: { sectors: true, infoAccess: true },
    });
    if (!res) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No sectors found for the zone with id '${input.zoneId}'`,
      });
    }

    if (res.infoAccess !== "Public" && !ctx.permissions.has("Read")) {
      return { ...res, sectors: undefined, hasAccess: false };
    }

    return { ...res, hasAccess: true };
  }),
  add: protectedProcedure.input(zone.schema).mutation(({ ctx, input }) => {
    if (!ctx.user.permissions.includes("crud:zones"))
      throw new TRPCError({ code: "UNAUTHORIZED" });
    return ctx.prisma.zone.create({
      data: { name: input.name, slug: slug(input.name) },
    });
  }),
  downlandAll: t.procedure.input(zone.id).query(({ ctx, input }) =>
    ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      include: {
        sectors: {
          include: {
            walls: {
              include: {
                routes: { include: { RoutePath: true, RouteGrade: true } },
                topos: true,
              },
            },
          },
        },
      },
    }),
  ),
});
