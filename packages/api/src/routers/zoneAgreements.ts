import agreements from "@andescalada/api/schemas/agreements";
import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { AgreementLevelSchema } from "@andescalada/db/zod";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const zoneAgreementsRouter = t.router({
  byId: protectedProcedure
    .input(z.object({ zoneAgreementId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.zoneAgreement.findUnique({
        where: { id: input.zoneAgreementId },
        include: {
          Agreement: { include: { title: true, description: true } },
          comment: true,
        },
      }),
    ),
  delete: protectedZoneProcedure
    .input(z.object({ zoneAgreementId: z.string() }))
    .mutation(({ ctx, input }) => {
      if (!ctx.permissions.has("EditZoneAgreements")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "EditZoneAgreements"),
        );
      }
      return ctx.prisma.zoneAgreement.update({
        where: { id: input.zoneAgreementId },
        data: { isDeleted: SoftDelete.DeletedPublic },
      });
    }),
  edit: protectedZoneProcedure
    .input(
      z
        .object({
          zoneAgreementId: z.string(),
        })
        .merge(agreements.data),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("EditZoneAgreements")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "EditZoneAgreements"),
        );
      }
      const author = await ctx.prisma.zoneAgreement.findUnique({
        where: { id: input.zoneAgreementId },
        select: { Author: { select: { email: true } } },
      });

      const agreement = await ctx.prisma.zoneAgreement.update({
        where: { id: input.zoneAgreementId },
        data: {
          level: input.level,
          comment: input.comment
            ? { update: { originalText: input.comment } }
            : undefined,
          coAuthors:
            author?.Author.email === ctx.user.email
              ? undefined
              : {
                  connect: { email: ctx.user.email },
                },
        },
      });

      return agreement;
    }),
});
