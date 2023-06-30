import { t } from "@andescalada/api/src/createRouter";
import { z } from "zod";

export const systemRouter = t.router({
  upToDateVersion: t.procedure
    .input(z.enum(["Android", "iOS"]))
    .query(({ input }) => {
      if (input === "Android") {
        return 30;
      }
      return 40; // iOS
    }),
});
