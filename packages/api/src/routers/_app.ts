import { agreementsRouter } from "routers/agreements";
import { alertsRouter } from "routers/alerts";
import { imagesRouter } from "routers/images";
import { multiPitchRouter } from "routers/multiPitch";
import { notificationsRouter } from "routers/notifications";
import { photoContestRouter } from "routers/photoContest";
import { routesRouter } from "routers/routes";
import { searchRouter } from "routers/search";
import { sectorsRouter } from "routers/sectors";
import { syncRouter } from "routers/sync";
import { systemRouter } from "routers/system";
import { toposRouter } from "routers/topos";
import { userRouter } from "routers/user";
import { wallsRouter } from "routers/walls";
import { zoneAccessRouter } from "routers/zoneAccess";
import { zoneReviewRouter } from "routers/zoneReview";

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
