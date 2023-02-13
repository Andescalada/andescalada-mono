import global from "@andescalada/api/schemas/global";
import { r } from "@andescalada/api/src/utils/regex";
import {
  InfoAccessSchema,
  StatusSchema,
  TransportationModeSchema,
} from "@andescalada/db/zod";
import { z } from "zod";

const id = z.object({ zoneId: z.string() });

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .regex(r.numbersAndLettersOnly, "Solo se permite letras y números"),
  infoAccess: z.nativeEnum(InfoAccessSchema.Enum, {
    required_error: "Requerido",
    invalid_type_error: "Requerido",
  }),
  coordinates: global.coordinates.optional(),
});

const status = z
  .object({ status: StatusSchema, message: z.string() })
  .merge(id);

const approveStatus = z.object({
  status: z.enum([StatusSchema.Enum.Approved, StatusSchema.Enum.Rejected]),
  message: z.string().optional(),
});
const rejectStatus = z.object({
  status: z.enum([StatusSchema.Enum.Approved, StatusSchema.Enum.Rejected]),
  message: z.string(),
});

const addDirections = z.object({
  name: z.string().optional(),
  transportationMode: z.nativeEnum(TransportationModeSchema.Enum, {
    required_error: "Requerido",
  }),
  description: z
    .string({ required_error: "Requerido" })
    .min(1, { message: "Requerido" }),
});

const nameSearch = z
  .string()
  .trim()
  .regex(
    r.numbersAndLettersOnly,
    "Solo se permiten números y letra minúsculas, caracteres especiales permitidos: . _ &",
  );

export default {
  schema,
  id,
  nameSearch,
  status,
  approveStatus,
  rejectStatus,
  addDirections,
};
