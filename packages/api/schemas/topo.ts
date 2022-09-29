import image from "@andescalada/api/schemas/image";
import { z } from "zod";

const schema = z.object({
  wallId: z.string(),
  name: z.string().optional(),
  main: z.boolean().optional(),
  image: image.schema,
});

export default { schema };
