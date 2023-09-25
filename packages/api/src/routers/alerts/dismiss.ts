import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const dismissRouteAlertById = protectedZoneProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (!ctx.permissions.has("DismissRouteAlert")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "DismissRouteAlert"),
      );
    }

    return ctx.prisma.routeAlert.update({
      where: { id: input.id },
      data: {
        dismissedDate: new Date(),
        DismissedBy: { connect: { id: ctx.user.id } },
      },
    });
  });
