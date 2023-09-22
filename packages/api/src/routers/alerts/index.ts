import { t } from "@andescalada/api/src/createRouter";
import { byId, list } from "@andescalada/api/src/routers/alerts/get";

import { upsertRouteAlert } from "./upsertRouteAlert";

export const alertsRouter = t.router({
  upsertRouteAlert,
  byId: byId,
  list: list,
});
