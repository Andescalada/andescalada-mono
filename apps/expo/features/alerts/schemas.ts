import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import { z } from "zod";

export const AddRouteAlertSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  kind: RouteAlertKindSchema,
  severity: RouteAlertSeveritySchema,
  dueDate: z.date().optional(),
  route: z
    .object({ id: z.string(), name: z.string(), sectorName: z.string() })
    .optional(),
});
