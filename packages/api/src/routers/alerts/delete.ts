import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { SoftDelete } from ".prisma/client";

export const deleteById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const alertToDelete = await ctx.prisma.routeAlert.findUniqueOrThrow({
      where: { id: input.id },
      select: { Author: { select: { id: true } } },
    });

    if (alertToDelete.Author.id !== ctx.user.id) {
      throw new TRPCError(
        error.unauthorizedAction(`delete not owned alert ${input.id}`),
      );
    }

    await ctx.prisma.routeAlert.update({
      where: { id: input.id },
      data: { isDeleted: SoftDelete.DeletedPublic },
    });
  });
