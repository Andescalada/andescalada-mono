/**
 * This file contains tRPC's HTTP response handler
 */
import { createContext } from "createContext";
import { appRouter } from "routers/_app";
import * as trpcNext from "@trpc/server/adapters/next";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  responseMeta({ ctx, type, errors }) {
    const allOk = errors.length === 0;
    const isQuery = type === "query";
    if (ctx?.res && allOk && isQuery) {
      const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
      return {
        headers: {
          "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        },
      };
    }
    return {};
  },
});
