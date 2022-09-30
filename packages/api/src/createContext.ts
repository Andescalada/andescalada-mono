import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import verifyAndDecodeToken from "./utils/verifyAndDecodeToken";

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
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

  if (user?.email) {
    const userExist = await prisma.user.findUnique({
      where: { email: user?.email },
    });
    if (!userExist && user?.email) {
      await prisma.user.create({
        data: {
          email: user.email,
          name: "",
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
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
