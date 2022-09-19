/**
 * This file contains tRPC's HTTP response handler
 */
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@andescalada/api/src/routers/_app';
import { createContext } from '@andescalada/api/src/createContext';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
