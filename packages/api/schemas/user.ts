import image from "@andescalada/api/schemas/image";
import { r } from "@andescalada/api/src/utils/regex";
import { z } from "zod";

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo"),
  image: image.schema.optional(),
  username: z
    .string()
    .trim()
    .min(3, "Nombre de usuario muy corto, mínimo 3 caracteres y máximo 15")
    .max(15, "Nombre de usuario muy corto, mínimo 3 caracteres y máximo 15")
    .regex(
      r.username,
      "Solo se permiten números y letra minúsculas, caracteres especiales permitidos: . _ &",
    ),
});

export default { schema };
