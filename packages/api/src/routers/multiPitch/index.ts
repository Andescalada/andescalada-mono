import { t } from "@andescalada/api/src/createRouter";
import addPitch from "@andescalada/api/src/routers/multiPitch/addPitch";
import byId from "@andescalada/api/src/routers/multiPitch/byId";
import convertRoute from "@andescalada/api/src/routers/multiPitch/convertRoute";
import deleteById from "@andescalada/api/src/routers/multiPitch/deleteById";
import editPitch from "@andescalada/api/src/routers/multiPitch/editPitch";

export const multiPitchRouter = t.router({
  convertRoute,
  byId,
  addPitch,
  deleteById,
  editPitch,
});
