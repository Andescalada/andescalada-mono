import { SoftDeleteSchema } from "@andescalada/db/zod";
import { z } from "zod";

const isDeleted = z.object({
  isDeleted: SoftDeleteSchema,
});

const coordinates = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export default { isDeleted, coordinates };
