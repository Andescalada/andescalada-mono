import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { Redis } from "@upstash/redis";

import verifyAndDecodeToken from "./utils/verifyAndDecodeToken";

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export const access = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const user = await verifyAndDecodeToken(req);

  if (user?.email && user?.auth0Id) {
    const userExist = await prisma.user.findUnique({
      where: { email: user?.email },
    });
    if (userExist && !userExist.auth0id) {
      await prisma.user.update({
        where: { email: user.email },
        data: {
          auth0id: user.auth0Id,
        },
      });
    }
    if (!userExist) {
      await prisma.user.create({
        data: {
          email: user.email,
          name: "",
          auth0id: user.auth0Id,
          username: `andescalada${Math.random().toString().substring(2, 9)}`,
        },
      });
    }
  }

  return {
    req,
    res,
    prisma,
    user,
    access,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
