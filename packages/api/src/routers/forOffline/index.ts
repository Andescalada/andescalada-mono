import { t } from "@andescalada/api/src/createRouter";
import allSectors from "@andescalada/api/src/routers/forOffline/allSectors";
import allWalls from "@andescalada/api/src/routers/forOffline/allWalls";
import routeByIdWithEvaluation from "@andescalada/api/src/routers/forOffline/routeByIdWithEvaluation";
import toposById from "@andescalada/api/src/routers/forOffline/toposById";
import wallsById from "@andescalada/api/src/routers/forOffline/wallsById";

export const forOfflineRouter = t.router({
  allSectors: allSectors,
  allWalls: allWalls,
  wallsById: wallsById,
  toposById: toposById,
  routeByIdWithEvaluation: routeByIdWithEvaluation,
});
