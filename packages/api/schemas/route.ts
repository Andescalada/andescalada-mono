import { r } from "@andescalada/api/src/utils/regex";
import { GradeSystemsSchema, RouteKindSchema } from "@andescalada/db/zod";
import { z } from "zod";

const schema = z.object({
  wallId: z.string(),
  name: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .regex(r.numbersAndLettersOnly, "Solo se permite letras y números"),
  kind: RouteKindSchema,
  grade: z.object({
    grade: z.number().nullable(),
    project: z.boolean(),
  }),
  unknownName: z.boolean().optional(),
  originalGradeSystem: z.nativeEnum(GradeSystemsSchema.Enum).optional(),
});

const routeId = z.object({ routeId: z.string() });

const extensionParams = z.object({
  extendedRouteId: z.string(),
});

export const descriptionLength = { max: 280, min: 20 };

const description = z.object({
  description: z
    .string({ required_error: "Requerido" })
    .min(descriptionLength.min, { message: "Muy corto, mínimo 50 caracteres" })
    .max(descriptionLength.max, {
      message: "Muy largo, máximo 280 caracteres",
    }),
});

export default { schema, routeId, extensionParams, description };
