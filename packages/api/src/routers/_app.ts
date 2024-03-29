import { agreementsRouter } from "@andescalada/api/src/routers/agreements";
import { alertsRouter } from "@andescalada/api/src/routers/alerts";
import { imagesRouter } from "@andescalada/api/src/routers/images";
import { multiPitchRouter } from "@andescalada/api/src/routers/multiPitch";
import { notificationsRouter } from "@andescalada/api/src/routers/notifications";
import { photoContestRouter } from "@andescalada/api/src/routers/photoContest";
import { routesRouter } from "@andescalada/api/src/routers/routes";
import { searchRouter } from "@andescalada/api/src/routers/search";
import { sectorsRouter } from "@andescalada/api/src/routers/sectors";
import { syncRouter } from "@andescalada/api/src/routers/sync";
import { systemRouter } from "@andescalada/api/src/routers/system";
import { toposRouter } from "@andescalada/api/src/routers/topos";
import { userRouter } from "@andescalada/api/src/routers/user";
import { wallsRouter } from "@andescalada/api/src/routers/walls";
import { zoneAccessRouter } from "@andescalada/api/src/routers/zoneAccess";
import { zoneReviewRouter } from "@andescalada/api/src/routers/zoneReview";

import { t } from "../createRouter";
import { publicRouter } from "./public/index";
import { zonesRouter } from "./zones";

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
  sync: syncRouter,
  public: publicRouter,
  photoContest: photoContestRouter,
  alerts: alertsRouter,
});

export type AppRouter = typeof appRouter;
