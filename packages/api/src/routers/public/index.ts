import { t } from "@andescalada/api/src/createRouter";
import { createUser } from "@andescalada/api/src/routers/public/createUser";

export const publicRouter = t.router({
  createUser: createUser,
});
