/**
 * This file contains tRPC's HTTP response handler
 */
import { createContext } from "@andescalada/api/src/createContext";
import { appRouter } from "@andescalada/api/src/routers/_app";
import * as trpcNext from "@trpc/server/adapters/next";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
