declare module "react-devtools-core";

declare module "@cloudinary/url-gen";
declare module "@cloudinary/url-gen/actions/effect";
declare module "@cloudinary/url-gen/actions/resize";

declare module "@andescalada/api/schemas/route" {
  import { z } from "zod";
  export const RouteDescriptionSchema: z.ZodObject<any>;
  export type RouteDescriptionSchemaType = z.infer<
    typeof RouteDescriptionSchema
  >;
}

declare module "@andescalada/utils/roundPoint" {
  export default function roundPoint(
    point: { x: number; y: number },
    precision?: number,
  ): { x: number; y: number };
}
