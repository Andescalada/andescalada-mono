import {
  AgreementLevelSchema,
  ClassicAgreementSchema,
} from "@andescalada/db/zod";
import { z } from "zod";

const agreementId = z.object({ agreementId: z.string() });
const data = z.object({
  level: z.nativeEnum(AgreementLevelSchema.enum, {
    invalid_type_error: "Requerido",
    description: "Requerido",
  }),
  comment: z.string().max(280, { message: "Máximo 280 caracteres" }).optional(),
});

const classic = z.object({ classic: ClassicAgreementSchema });

export default { data, classic, agreementId };
