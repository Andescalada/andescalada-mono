import { PrismaClient, SoftDelete } from "@andescalada/db";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { Redis } from "@upstash/redis";
import acceptLanguage from "accept-language";

import verifyAndDecodeToken from "./utils/verifyAndDecodeToken";

const FALLBACK_LANGUAGE = "es";

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

acceptLanguage.languages(["es-Cl", "es-EN"]);
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({
  req,
  res,
}: Partial<trpcNext.CreateNextContextOptions> = {}) => {
  if (!req || !res) {
    return {
      req,
      res,
      prisma,
      access,
    };
  }
  const { user, verified } = await verifyAndDecodeToken(req);

  const language = {
    language: acceptLanguage.get(req.headers["accept-language"]),
    simplified:
      acceptLanguage.get(req.headers["accept-language"])?.split("-")[0] ??
      FALLBACK_LANGUAGE,
  };

  if (user?.email && user?.auth0Id) {
    const userExist = await prisma.user.findUnique({
      where: { email: user?.email },
    });
    if (!userExist) {
      await prisma.user.create({
        data: {
          email: user.email,
          auth0id: user.auth0Id,
        },
      });
    } else {
      if (!userExist.auth0id) {
        await prisma.user.update({
          where: { email: user.email },
          data: {
            auth0id: user.auth0Id,
          },
        });
        if (userExist.isDeleted === SoftDelete.DeletedPublic) {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              isDeleted: SoftDelete.NotDeleted,
            },
          });
        }
      }
    }
  }

  return {
    req,
    res,
    prisma,
    user,
    access,
    verified,
    language,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
