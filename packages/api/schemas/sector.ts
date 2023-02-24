import { r } from "@andescalada/api/src/utils/regex";
import { SectorKindSchema } from "@andescalada/db/zod";
import { z } from "zod";

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .regex(r.numbersAndLettersOnly, "Solo se permite letras y números"),
  sectorKind: z.nativeEnum(SectorKindSchema.enum, {
    required_error: "Requerido",
  }),
});

const id = z.object({ sectorId: z.string() });

const edit = schema.pick({ name: true }).merge(id);

export default { schema, id, edit };
