import { r } from "@andescalada/api/src/utils/regex";
import { z } from "zod";

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .regex(r.numbersAndLettersOnly, "Solo se permite letras y números"),
});

export default { schema };
