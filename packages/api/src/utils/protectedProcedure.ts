import { Context } from "@andescalada/api/src/createContext";
import { InferContext } from "@andescalada/api/src/utils/inferContext";
import session, { SessionUser } from "@andescalada/api/src/utils/session";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { t } from "../createRouter";

export const isAuth = t.middleware(async ({ ctx, next }) => {
  const { verified } = ctx;
  if (verified === false) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!ctx.verifiedUser) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to fetch user",
    });
  }

  const user = await getUser({ ctx });

  const richUser = { ...user, permissions: ctx.verifiedUser.permissions };

  return next({
    ctx: { ...ctx, user: richUser },
  });
});

export const protectedProcedure = t.procedure.use(isAuth);

export type ProtectedContext = InferContext<typeof isAuth>;

const getUser = async ({ ctx }: { ctx: Context }) => {
  let user: SessionUser | null = null;

  user = await session.get({ ctx });

  if (user?.auth0id !== ctx.verifiedUser?.auth0Id) {
    user = null;
  }

  if (!user) {
    user = await getUserFromDb({ ctx });
    await session.set({
      ctx,
      user: {
        auth0id: user.auth0id,
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  }

  if (!user) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to fetch user",
    });
  }

  return user;
};

export const SelectUser = {
  id: true,
  name: true,
  username: true,
  auth0id: true,
  phoneVerified: true,
  emailVerified: true,
  isDeleted: true,
};

const getUserFromDb = async ({ ctx }: { ctx: Context }) => {
  const { verifiedUser } = ctx;

  if (!verifiedUser)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to fetch user",
    });

  const whereCondition =
    verifiedUser.connectionStrategy === "sms"
      ? {
          PhoneNumber: {
            fullNumber: verifiedUser.phoneNumber,
          },
        }
      : {
          email: verifiedUser.email,
        };

  let user = await ctx.prisma.user.findFirst({
    where: whereCondition,
    select: SelectUser,
  });

  console.log("USER", user);

  if (!user) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to fetch user",
    });
  } else {
    const auth0IdIsEmail =
      !!verifiedUser.auth0Id &&
      !!user.auth0id &&
      user.auth0id.split("|")[0] === "email" &&
      verifiedUser.auth0Id.split("|")[0] === "sms";

    let updatedData = {};

    if (!user.auth0id || auth0IdIsEmail) {
      updatedData = { ...updatedData, auth0id: verifiedUser.auth0Id };
    }

    if (verifiedUser.connectionStrategy === "sms" && !user.phoneVerified) {
      updatedData = { ...updatedData, phoneVerified: true };
    }

    if (verifiedUser.connectionStrategy === "email" && !user.emailVerified) {
      updatedData = { ...updatedData, emailVerified: true };
    }

    if (user.isDeleted === SoftDelete.DeletedPublic) {
      updatedData = { ...updatedData, isDeleted: SoftDelete.NotDeleted };
    }

    if (Object.keys(updatedData).length > 0) {
      user = await ctx.prisma.user.update({
        where: { id: user.id },
        data: updatedData,
        select: SelectUser,
      });
    }
  }

  const richUser = { ...user, permissions: verifiedUser.permissions };

  return richUser;
};
