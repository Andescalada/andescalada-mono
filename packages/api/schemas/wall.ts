import { z } from "zod";

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo"),
});

export default { schema };