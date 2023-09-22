import { t } from "@andescalada/api/src/createRouter";
import { deleteById } from "@andescalada/api/src/routers/alerts/delete";
import { byId, list } from "@andescalada/api/src/routers/alerts/get";

import { upsertRouteAlert } from "./upsertRouteAlert";

export const alertsRouter = t.router({
  upsertRouteAlert: upsertRouteAlert,
  byId: byId,
  list: list,
  deleteById: deleteById,
});
