import { t } from "@andescalada/api/src/createRouter";
import add from "@andescalada/api/src/routers/multiPitch/add";
import addPitch from "@andescalada/api/src/routers/multiPitch/addPitch";
import byId from "@andescalada/api/src/routers/multiPitch/byId";
import convertRoute from "@andescalada/api/src/routers/multiPitch/convertRoute";
import deleteById from "@andescalada/api/src/routers/multiPitch/deleteById";
import deletePitch from "@andescalada/api/src/routers/multiPitch/deletePitch";
import editPitch from "@andescalada/api/src/routers/multiPitch/editPitch";
import pitchById from "@andescalada/api/src/routers/multiPitch/pitchById";

export const multiPitchRouter = t.router({
  convertRoute,
  byId,
  addPitch: addPitch,
  deleteById,
  editPitch,
  deletePitch,
  pitchById,
  add,
});
