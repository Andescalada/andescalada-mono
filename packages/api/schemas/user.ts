import image from "@andescalada/api/schemas/image";
import { z } from "zod";

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo"),
  image: image.schema.optional(),
});

export default { schema };
