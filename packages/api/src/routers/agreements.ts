import agreements from "@andescalada/api/schemas/agreements";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

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
});
