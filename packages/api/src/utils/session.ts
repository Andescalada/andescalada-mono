import { Context } from "@andescalada/api/src/createContext";
import { Prisma } from "@andescalada/db";
import { TRPCError } from "@trpc/server";
import { deserialize, serialize } from "superjson";
import { SuperJSONResult } from "superjson/dist/types";

const id = ({ ctx }: { ctx: Context }) => {
  const { verifiedUser } = ctx;
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

export const SelectUser = {
  id: true,
  name: true,
  username: true,
  auth0id: true,
};

export type SessionUser = Prisma.UserGetPayload<{
  select: typeof SelectUser;
}>;

const get = async ({ ctx }: { ctx: Context }) => {
  const rawSession = await ctx.session.get<SuperJSONResult>(id({ ctx }));

  if (!rawSession) {
    return null;
  }
  return deserialize<SessionUser>(rawSession);
};

const TWO_HOURS = 60 * 60 * 2;

const set = ({ ctx, user }: { ctx: Context; user: SessionUser }) => {
  const serializedUser = serialize(user);
  return ctx.session.set(id({ ctx }), serializedUser, { ex: TWO_HOURS });
};

export default { get, id, set };
