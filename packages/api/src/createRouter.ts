import * as trpc from '@trpc/server';
import { transformer } from "./transformer"
import { Context } from './createContext';


/**
 * Helper function to create a router with context
 */
export const t = trpc.initTRPC.context< Context >().create({
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  transformer,
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // errorFormatter: ({ shape, error }) => {},
});
