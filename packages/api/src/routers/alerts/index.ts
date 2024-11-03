import { t } from "createRouter";
import { deleteById } from "routers/alerts/delete";
import { byId, list } from "routers/alerts/get";

import { dismissRouteAlertById } from "./dismiss";
import { upsertRouteAlert } from "./upsertRouteAlert";

export const alertsRouter = t.router({
  upsertRouteAlert: upsertRouteAlert,
  byId: byId,
  list: list,
  deleteById: deleteById,
  dismissRouteAlertById: dismissRouteAlertById,
});
