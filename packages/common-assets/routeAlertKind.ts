import { RouteAlertKindSchema } from "@andescalada/db/zod";

// Define our own Colors type to avoid dependency on UI package
type Colors = string;

const routeAlertKind = (
  level: typeof RouteAlertKindSchema._type,
): { color: Colors; backgroundColor: Colors; label: string } => {
  switch (level) {
    case RouteAlertKindSchema.Enum.BadGear:
      return {
        color: "grayscale.white",
        backgroundColor: "semantic.error",
        label: "Anclaje",
      };
    case RouteAlertKindSchema.Enum.BirdNest:
      return {
        color: "grayscale.black",
        backgroundColor: "semantic.warning",
        label: "Nido",
      };
    case RouteAlertKindSchema.Enum.LooseRock:
      return {
        color: "grayscale.white",
        backgroundColor: "semantic.info",
        label: "Roca suelta",
      };
    case RouteAlertKindSchema.Enum.Other:
      return {
        color: "grayscale.white",
        backgroundColor: "grayscale.800",
        label: "Otro",
      };

    default:
      throw new Error("Route alert kind not valid");
  }
};

export default routeAlertKind;
