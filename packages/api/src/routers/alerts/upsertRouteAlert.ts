import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import { z } from "zod";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  kind: RouteAlertKindSchema,
  severity: RouteAlertSeveritySchema,
  dueDate: z.date().optional(),
  routeId: z.string(),
});

export const upsertRouteAlert = protectedZoneProcedure
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    if (input.id) {
      return ctx.prisma.routeAlert.update({
        where: { id: input.id },
        data: {
          title: { update: { originalText: input.title } },
          ...(input.description && {
            description: {
              upsert: {
                create: {
                  originalText: input.description,
                  originalLang: { connect: { languageId: "es" } },
                },
                update: {
                  originalText: input.description,
                },
              },
            },
          }),
          kind: input.kind,
          severity: input.severity,
          dueDate: input.dueDate,
        },
      });
    }

    return ctx.prisma.routeAlert.create({
      data: {
        title: {
          create: {
            originalText: input.title,
            originalLang: { connect: { languageId: "es" } },
          },
        },
        ...(input.description && {
          description: {
            create: {
              originalText: input.description,
              originalLang: { connect: { languageId: "es" } },
            },
          },
        }),
        kind: input.kind,
        severity: input.severity,
        dueDate: input.dueDate,
        Route: { connect: { id: input.routeId } },
        Author: { connect: { id: ctx.user.id } },
      },
    });
  });
