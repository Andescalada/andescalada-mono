import { SoftDeleteSchema } from "@andescalada/db/zod";
import { z } from "zod";

const isDeleted = z.object({
  isDeleted: SoftDeleteSchema,
});

export default { isDeleted };
