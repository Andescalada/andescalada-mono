import user from "@andescalada/api/schemas/user";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";

import { t } from "../createRouter";

export const userRouter = t.router({
  ownInfo: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.user.findUnique({
      where: { email: ctx.session.user.email },
      select: {
        email: true,
        firstLogin: true,
        id: true,
        profilePhoto: true,
        name: true,
      },
    }),
  ),
  edit: protectedProcedure.input(user.schema).mutation(({ ctx, input }) =>
    ctx.prisma.user.update({
      where: { email: ctx.session.user.email },
      data: {
        name: input.name,
        profilePhoto: input.image ? { create: input.image } : undefined,
        firstLogin: false,
      },
    }),
  ),
});
