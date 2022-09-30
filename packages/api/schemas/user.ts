import image from "@andescalada/api/schemas/image";
import { z } from "zod";

const lowercaseOnly = /^[a-z]+$/g;
const noSpaces = /^\S*$/g;
const numbersAndLettersOnly = /^[A-Za-z0-9_&.\s]*$/;

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
    .regex(lowercaseOnly, "Solo letras minúsculas")
    .regex(noSpaces, "No se permiten espacios")
    .regex(
      numbersAndLettersOnly,
      "Solo se permiten números y letras, caracteres especiales permitidos: . _ &",
    ),
});

export default { schema };
