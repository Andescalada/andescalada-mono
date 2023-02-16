import route from "@andescalada/api/schemas/route";
import { z } from "zod";

const addPitchFrontEnd = route.schema
  .pick({ kind: true })
  .merge(
    z.object({ grade: z.union([z.number().nullable(), z.literal("project")]) }),
  );

const addPitch = route.schema.pick({
  kind: true,
  grade: true,
  originalGradeSystem: true,
});

type AddPitch = z.infer<typeof addPitch>;

export default { addPitchFrontEnd, addPitch };
