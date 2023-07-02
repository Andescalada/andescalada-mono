import { Context } from "@andescalada/api/src/createContext";
import { InferContext } from "@andescalada/api/src/utils/inferContext";
import { Prisma, SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { deserialize, serialize } from "superjson";
import { SuperJSONResult } from "superjson/dist/types";

import { t } from "../createRouter";

const SelectUser = {
  id: true,
  name: true,
  username: true,
  auth0id: true,
  isDeleted: true,
  phoneVerified: true,
  emailVerified: true,
};

type User = Prisma.UserGetPayload<{
  select: typeof SelectUser;
}>;

export const isAuth = t.middleware(async ({ ctx, next }) => {
  const { verified } = ctx;
  if (verified === false) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!ctx.user) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to fetch user",
    });
  }

  const user = await getUser({ ctx });

  const richUser = { ...user, permissions: ctx.user.permissions };

  return next({
    ctx: { ...ctx, user: richUser },
  });
});

export const protectedProcedure = t.procedure.use(isAuth);

export type ProtectedContext = InferContext<typeof isAuth>;

const sessionId = ({ ctx }: { ctx: Context }) => {
  const { user: verifiedUser } = ctx;
  const sessionId =
    verifiedUser?.connectionStrategy === "sms"
      ? verifiedUser?.phoneNumber
      : verifiedUser?.email;

  if (!sessionId) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to fetch user, email or phone number not found",
    });
  }
  return sessionId;
};

const getUserSession = async ({ ctx }: { ctx: Context }) => {
  const rawSession = await ctx.session.get<SuperJSONResult>(sessionId({ ctx }));

  if (!rawSession) {
    return null;
  }
  return deserialize<User>(rawSession);
};

const TWO_HOURS = 60 * 60 * 2;

const setUserSession = ({ ctx, user }: { ctx: Context; user: User }) => {
  const serializedUser = serialize(user);
  return ctx.session.set(sessionId({ ctx }), serializedUser, { ex: TWO_HOURS });
};

const getUser = async ({ ctx }: { ctx: Context }) => {
  let user: User | null = null;

  user = await getUserSession({ ctx });

  if (!user) {
    user = await getUserFromDb({ ctx });
    await setUserSession({ ctx, user });
  }

  if (!user) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to fetch user",
    });
  }

  return user;
};

const getUserFromDb = async ({ ctx }: { ctx: Context }) => {
  const { user: verifiedUser, verified } = ctx;
  if (verified === false) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!verifiedUser) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unable to fetch verified user",
    });
  }

  const whereCondition =
    verifiedUser?.connectionStrategy === "sms"
      ? {
          PhoneNumber: {
            fullNumber: verifiedUser?.phoneNumber,
          },
        }
      : {
          email: verifiedUser?.email,
        };

  let user = await ctx.prisma.user.findFirst({
    where: whereCondition,
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
