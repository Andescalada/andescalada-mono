import global from "@andescalada/api/schemas/global";
import { r } from "@andescalada/api/src/utils/regex";
import { SectorKindSchema } from "@andescalada/db/zod";
import { z } from "zod";

const sectorName = z
  .string({ required_error: "Requerido" })
  .trim()
  .min(3, "Nombre muy corto")
  .max(50, "Nombre muy largo")
  .regex(r.numbersAndLettersOnly, "Solo se permite letras y números");

const schema = z.object({
  sectorId: z.string().optional(),
  name: sectorName,
  sectorKind: z.nativeEnum(SectorKindSchema.enum, {
    required_error: "Requerido",
  }),
});

const id = z.object({ sectorId: z.string() });

const edit = schema.merge(id).merge(
  z.object({
    name: sectorName.optional(),
    sectorKind: z.nativeEnum(SectorKindSchema.enum).optional(),
    coordinates: global.coordinates.optional(),
  }),
);

export default { schema, id, edit };
