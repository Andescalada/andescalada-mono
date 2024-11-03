import addDirection from "routers/zones/addDirection";
import all from "routers/zones/all";
import allSectors from "routers/zones/allSectors";
import {
  addCoverPhoto,
  deleteCoverPhoto,
  getCoverPhoto,
} from "routers/zones/coverPhoto";
import create from "routers/zones/create";
import deleteDirection from "routers/zones/deleteDirection";
import directionsById from "routers/zones/directionsById";
import edit from "routers/zones/edit";
import featured from "routers/zones/featured";
import find from "routers/zones/find";
import location from "routers/zones/location";
import { membersList } from "routers/zones/membersList";
import publicById from "routers/zones/publicById";
import publicWallById from "routers/zones/publicWallById";
import recentlyAdded from "routers/zones/recentlyAdded";
import statusById from "routers/zones/statusById";
import upsertDescription from "routers/zones/upsertDescription";
import usersByRole from "routers/zones/usersByRole";

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
  getCoverPhoto: getCoverPhoto,
  addCoverPhoto: addCoverPhoto,
  deleteCoverPhoto: deleteCoverPhoto,
});
