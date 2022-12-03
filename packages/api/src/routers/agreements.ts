import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { z } from "zod";

import { t } from "../createRouter";

export const agreementsRouter = t.router({
  classic: t.procedure
    .input(z.object({ classic: ClassicAgreementSchema }))
    .query(({ ctx, input }) =>
      ctx.prisma.agreement.findMany({
        where: { classic: input.classic },
        include: {
          title: { select: { originalText: true } },
          description: { select: { originalText: true } },
        },
      }),
    ),
});
