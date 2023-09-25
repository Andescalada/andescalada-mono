import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { RouteAlertSeveritySchema } from "@andescalada/db/zod";
import { z } from "zod";

import { SoftDelete } from ".prisma/client";

export const list = protectedZoneProcedure
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
        dismissedDate: null,
        OR: [{ dueDate: null }, { dueDate: { gte: new Date() } }],
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

export const byId = protectedZoneProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const alert = await ctx.prisma.routeAlert.findUnique({
      where: { id: input.id },
      include: {
        title: { select: { originalText: true } },
        description: { select: { originalText: true } },
        Route: {
          select: {
            name: true,
            id: true,
            kind: true,
            position: true,
            RouteGrade: true,
            Wall: {
              select: {
                name: true,
                id: true,
                Sector: { select: { name: true, id: true } },
              },
            },
          },
        },
        Author: {
          select: { name: true, id: true, profilePhoto: true, username: true },
        },
      },
    });

    return alert;
  });
