import addDirection from "@andescalada/api/src/routers/zones/addDirection";
import all from "@andescalada/api/src/routers/zones/all";
import allSectors from "@andescalada/api/src/routers/zones/allSectors";
import create from "@andescalada/api/src/routers/zones/create";
import deleteDirection from "@andescalada/api/src/routers/zones/deleteDirection";
import directionsById from "@andescalada/api/src/routers/zones/directionsById";
import edit from "@andescalada/api/src/routers/zones/edit";
import featured from "@andescalada/api/src/routers/zones/featured";
import find from "@andescalada/api/src/routers/zones/find";
import location from "@andescalada/api/src/routers/zones/location";
import { membersList } from "@andescalada/api/src/routers/zones/membersList";
import publicById from "@andescalada/api/src/routers/zones/publicById";
import publicWallById from "@andescalada/api/src/routers/zones/publicWallById";
import recentlyAdded from "@andescalada/api/src/routers/zones/recentlyAdded";
import statusById from "@andescalada/api/src/routers/zones/statusById";
import upsertDescription from "@andescalada/api/src/routers/zones/upsertDescription";
import usersByRole from "@andescalada/api/src/routers/zones/usersByRole";

import { t } from "../../createRouter";

export const zonesRouter = t.router({
  location: location,
  find,
  all: all,
  recentlyAdded,
  publicById,
  publicWallById,
  edit: edit,
  allSectors: allSectors,
  create,
  statusById,
  usersByRole: usersByRole,
  membersList: membersList,
  directionsById,
  addDirection,
  deleteDirection,
  upsertDescription: upsertDescription,
  featured: featured,
});
