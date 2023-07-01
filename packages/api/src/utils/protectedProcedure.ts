import { InferContext } from "@andescalada/api/src/utils/inferContext";
import { Prisma, SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { t } from "../createRouter";

const SelectUser = {
  id: true,
  name: true,
  username: true,
  email: true,
  phoneNumber: true,
  auth0id: true,
  isDeleted: true,
};

type User = Prisma.UserGetPayload<{
  select: typeof SelectUser;
}>;

export const isAuth = t.middleware(async ({ ctx, next }) => {
  const { user: verifiedUser, verified } = ctx;
  if (verified === false) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!verifiedUser || !verified) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to fetch user",
    });
  }

  let user: User | null = null;

  user = await ctx.prisma.user.findUnique({
    where: {
      ...(verifiedUser.connectionStrategy === "email"
        ? { email: verifiedUser.email }
        : { phoneNumber: verifiedUser.phoneNumber }),
    },
    select: SelectUser,
  });

  if (!user) {
    user = await ctx.prisma.user.create({
      data: {
        email: verifiedUser.email,
        auth0id: verifiedUser.auth0Id,
      },
      select: SelectUser,
    });
  } else {
    if (!user.auth0id) {
      user = await ctx.prisma.user.update({
        where: { email: verifiedUser.email },
        data: {
          auth0id: verifiedUser.auth0Id,
        },
        select: SelectUser,
      });
      if (user.isDeleted === SoftDelete.DeletedPublic) {
        user = await ctx.prisma.user.update({
          where: { email: verifiedUser.email },
          data: {
            isDeleted: SoftDelete.NotDeleted,
          },
          select: SelectUser,
        });
      }
    }
  }

  const richUser = { ...user, permissions: verifiedUser.permissions };

  return next({
    ctx: { ...ctx, user: richUser },
  });
});

export const protectedProcedure = t.procedure.use(isAuth);

export type ProtectedContext = InferContext<typeof isAuth>;
