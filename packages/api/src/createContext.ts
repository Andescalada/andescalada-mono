import { PrismaClient } from "@andescalada/db";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { Redis } from "@upstash/redis";
import acceptLanguage from "accept-language";

import verifyAndDecodeToken from "./utils/verifyAndDecodeToken";

const FALLBACK_LANGUAGE = "es";

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development" && !process.env.SILENT_LOG_QUERIES
      ? ["query", "error", "warn"]
      : ["error"],
});

export const access = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export const session = new Redis({
  url: process.env.UPSTASH_REDIS_SESSIONS_URL || "",
  token: process.env.UPSTASH_REDIS_SESSION_TOKEN || "",
});

acceptLanguage.languages(["es-Cl", "es-EN"]);

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
      session,
    };
  }
  const { verifiedUser, verified } = await verifyAndDecodeToken(req);

  const language = {
    language: acceptLanguage.get(req.headers["accept-language"]),
    simplified:
      acceptLanguage.get(req.headers["accept-language"])?.split("-")[0] ??
      FALLBACK_LANGUAGE,
  };

  return {
    req,
    res,
    prisma,
    verifiedUser,
    access,
    verified,
    language,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
