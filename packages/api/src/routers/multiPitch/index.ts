import { t } from "createRouter";
import add from "routers/multiPitch/add";
import addPitch from "routers/multiPitch/addPitch";
import byId from "routers/multiPitch/byId";
import convertRoute from "routers/multiPitch/convertRoute";
import deleteById from "routers/multiPitch/deleteById";
import deletePitch from "routers/multiPitch/deletePitch";
import editPitch from "routers/multiPitch/editPitch";
import pitchById from "routers/multiPitch/pitchById";

export const multiPitchRouter = t.router({
  convertRoute,
  byId,
  addPitch: addPitch,
  deleteById,
  editPitch: editPitch,
  deletePitch,
  pitchById,
  add,
});
