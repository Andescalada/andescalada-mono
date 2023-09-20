import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { RouteAlertSeveritySchema } from "@andescalada/db/zod";
import { z } from "zod";

import { SoftDelete } from ".prisma/client";

const routeAlerts = protectedZoneProcedure
  .input(
    z.object({
      take: z.number().optional(),
      severity: z.nativeEnum(RouteAlertSeveritySchema.Enum).optional(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const alerts = await ctx.prisma.routeAlert.findMany({
      where: {
        Route: { Wall: { Sector: { Zone: { id: input.zoneId } } } },
        dismissedDate: undefined,
        isDeleted: SoftDelete.NotDeleted,
        severity: input.severity,
      },
      orderBy: { createdAt: "desc" },
      take: input.take,
      include: {
        title: { select: { originalText: true } },
        description: { select: { originalText: true } },
        Author: { select: { name: true } },
        Route: {
          select: {
            id: true,
            name: true,
            Wall: {
              select: {
                id: true,
                name: true,
                Sector: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return alerts;
  });

export default routeAlerts;
