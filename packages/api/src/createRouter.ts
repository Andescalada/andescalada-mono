import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './createContext';

/**
 * Helper function to create a router with context
 */
export const t = initTRPC.context<Context>().create({
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  transformer: superjson,
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // errorFormatter: ({ shape, error }) => {},
});
