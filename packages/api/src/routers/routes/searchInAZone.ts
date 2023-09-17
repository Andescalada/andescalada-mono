import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { SoftDelete } from ".prisma/client";

export const searchInAZone = protectedZoneProcedure
  .input(zone.id.merge(z.object({ search: z.string() })))
  .mutation(async ({ ctx, input }) => {
    const { zoneId, search } = input;
    const zone = await ctx.prisma.zone.findUniqueOrThrow({
      where: { id: zoneId },
    });

    if (ctx.permissions.has("Read") && zone.infoAccess !== "Public") {
      throw new TRPCError(error.unauthorizedActionForZone(zoneId, "Read"));
    }

    const routes = await ctx.prisma.route.findMany({
      where: {
        name: { contains: search },
        isDeleted: SoftDelete.NotDeleted,
        Wall: { Sector: { Zone: { id: zoneId } } },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        Wall: {
          select: {
            name: true,
            Sector: {
              select: { name: true, Zone: { select: { name: true } } },
            },
          },
        },
      },
    });
    return routes;
  });
