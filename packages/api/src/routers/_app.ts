/**
 * This file contains the root router of your tRPC-backend
 */
import { agreementsRouter } from "@andescalada/api/src/routers/agreements";
import { imagesRouter } from "@andescalada/api/src/routers/images";
import { multiPitchRouter } from "@andescalada/api/src/routers/multiPitch";
import { notificationsRouter } from "@andescalada/api/src/routers/notifications";
import { routesRouter } from "@andescalada/api/src/routers/routes";
import { searchRouter } from "@andescalada/api/src/routers/search";
import { sectorsRouter } from "@andescalada/api/src/routers/sectors";
import { systemRouter } from "@andescalada/api/src/routers/system";
import { toposRouter } from "@andescalada/api/src/routers/topos";
import { userRouter } from "@andescalada/api/src/routers/user";
import { wallsRouter } from "@andescalada/api/src/routers/walls";
import { zoneAccessRouter } from "@andescalada/api/src/routers/zoneAccess";
import { zoneReviewRouter } from "@andescalada/api/src/routers/zoneReview";

import { t } from "../createRouter";
import { zonesRouter } from "./zones";

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
  routes: routesRouter,
  user: userRouter,
  search: searchRouter,
  notifications: notificationsRouter,
  agreements: agreementsRouter,
  zoneReview: zoneReviewRouter,
  zoneAccess: zoneAccessRouter,
  images: imagesRouter,
  multiPitch: multiPitchRouter,
  system: systemRouter,
});

export type AppRouter = typeof appRouter;
