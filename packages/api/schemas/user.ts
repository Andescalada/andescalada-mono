import image from "@andescalada/api/schemas/image";
import { r } from "@andescalada/api/src/utils/regex";
import { z } from "zod";

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo"),
  image: image.schema.optional(),
  username: z
    .string()
    .min(3, "Nombre de usuario muy corto, mínimo 3 caracteres")
    .max(15, "Nombre de usuario muy largo")
    .regex(r.lowercaseOnly, "Solo letras minúsculas")
    .regex(r.noSpaces, "No se permiten espacios")
    .regex(
      r.numbersLettersAndSpecialOnly,
      "Solo se permiten números y letras, caracteres especiales permitidos: . _ &",
    ),
});

export default { schema };
