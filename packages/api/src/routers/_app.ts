/**
 * This file contains the root router of your tRPC-backend
 */
import { sectorsRouter } from '@andescalada/api/src/routers/sectors';
import { toposRouter } from '@andescalada/api/src/routers/topos';
import { wallsRouter } from '@andescalada/api/src/routers/walls';
import { t } from '../createRouter';
import { zonesRouter } from './zones';

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = t.router({
  zones: zonesRouter,
  sectors: sectorsRouter,
  walls: wallsRouter,
  topos: toposRouter,
});

export type AppRouter = typeof appRouter;
