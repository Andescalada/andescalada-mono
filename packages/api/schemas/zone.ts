import { r } from "@andescalada/api/src/utils/regex";
import { z } from "zod";

const id = z.object({ zoneId: z.string() });

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .regex(r.numbersAndLettersOnly, "Solo se permite letras y números"),
});

const nameSearch = z
  .string()
  .trim()
  .regex(
    r.numbersAndLettersOnly,
    "Solo se permiten números y letra minúsculas, caracteres especiales permitidos: . _ &",
  );

export default { schema, id, nameSearch };
