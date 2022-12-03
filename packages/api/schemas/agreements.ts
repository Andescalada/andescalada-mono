import {
  AgreementLevelSchema,
  ClassicAgreementSchema,
} from "@andescalada/db/zod";
import { z } from "zod";

const schema = z.object({
  agreementId: z.string(),
  level: AgreementLevelSchema,
  comment: z.string().max(280),
});

const classic = z.object({ classic: ClassicAgreementSchema });

export default { schema, classic };
