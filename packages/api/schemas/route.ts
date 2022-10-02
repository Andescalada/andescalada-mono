import { r } from "@andescalada/api/src/utils/regex";
import { RouteKind } from "@prisma/client";
import { z } from "zod";

const schema = z.object({
  wallId: z.string(),
  name: z
    .string({ required_error: "Requerido" })
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .regex(r.numbersAndLettersOnly, "Solo se permite letras y números"),
  kind: z.nativeEnum(RouteKind),
  grade: z.object({
    grade: z.number().nullable(),
    project: z.boolean(),
  }),
});

export default { schema };
