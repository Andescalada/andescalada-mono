import agreements from "@andescalada/api/schemas/agreements";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { t } from "../createRouter";

export const agreementsRouter = t.router({
  classic: t.procedure.input(agreements.classic).query(({ ctx, input }) =>
    ctx.prisma.agreement.findMany({
      where: { classic: input.classic },
      include: {
        title: { select: { originalText: true } },
        description: { select: { originalText: true } },
      },
    }),
  ),
  addToZoneList: protectedZoneProcedure
    .input(
      agreements.data.merge(agreements.classic).merge(agreements.agreementId),
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.zoneAgreement.create({
        data: {
          Author: { connect: { email: ctx.user.email } },
          Zone: { connect: { id: input.zoneId } },
          Agreement: { connect: { id: input.agreementId } },
          level: input.level,
          comment: !!input.comment
            ? {
                create: {
                  originalText: input.comment,
                  originalLang: {
                    connect: { languageId: "es" },
                  },
                },
              }
            : undefined,
        },
      }),
    ),
  adminAgreementsList: protectedZoneProcedure.query(async ({ ctx, input }) => {
    if (!ctx.permissions.has("EditZoneAgreements")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "EditZoneAgreements"),
      );
    }
    return ctx.prisma.zoneAgreement.findMany({
      where: {
        zoneId: input.zoneId,
        OR: [
          { isDeleted: SoftDelete.NotDeleted },
          { isDeleted: SoftDelete.DeletedPublic },
        ],
      },
      include: {
        Agreement: {
          include: {
            title: { select: { originalText: true } },
            description: { select: { originalText: true } },
            ZoneAgreement: {
              where: { zoneId: input.zoneId },
              select: { comment: { select: { originalText: true } } },
            },
          },
        },
      },
    });
  }),
  restoreAgreement: protectedZoneProcedure
    .input(agreements.zoneAgreementId)
    .mutation(({ ctx, input }) => {
      if (!ctx.permissions.has("EditZoneAgreements")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "EditZoneAgreements"),
        );
      }
      return ctx.prisma.zoneAgreement.update({
        where: { id: input.zoneAgreementId },
        data: { isDeleted: SoftDelete.NotDeleted },
      });
    }),
});
