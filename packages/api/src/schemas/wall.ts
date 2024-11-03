import { r } from "utils/regex";
import { z } from "zod";

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .regex(r.numbersAndLettersOnly, "Solo se permite letras y números"),
});

const id = z.object({ wallId: z.string() });

export default { schema, id };
