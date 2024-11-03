import { t } from "createRouter";
import { createUser } from "routers/public/createUser";

export const publicRouter = t.router({
  createUser: createUser,
});
