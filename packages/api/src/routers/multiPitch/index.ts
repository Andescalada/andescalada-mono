import { t } from "@andescalada/api/src/createRouter";
import addPitch from "@andescalada/api/src/routers/multiPitch/addPitch";
import byId from "@andescalada/api/src/routers/multiPitch/byId";
import convertRoute from "@andescalada/api/src/routers/multiPitch/convertRoute";

export const multiPitchRouter = t.router({
  convertRoute,
  byId,
  addPitch,
});
