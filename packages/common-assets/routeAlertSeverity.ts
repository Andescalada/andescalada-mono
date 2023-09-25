import { RouteAlertSeveritySchema } from "@andescalada/db/zod";
import { Colors } from "@andescalada/ui";

const routeAlertSeverity = (
  level: typeof RouteAlertSeveritySchema._type,
): { color: Colors; backgroundColor: Colors; label: string } => {
  switch (level) {
    case RouteAlertSeveritySchema.Enum.High:
      return {
        color: "grayscale.white",
        backgroundColor: "semantic.error",
        label: "Alta",
      };
    case RouteAlertSeveritySchema.Enum.Medium:
      return {
        color: "grayscale.black",
        backgroundColor: "semantic.warning",
        label: "Media",
      };
    case RouteAlertSeveritySchema.Enum.Low:
      return {
        color: "grayscale.white",
        backgroundColor: "semantic.info",
        label: "Baja",
      };
    case RouteAlertSeveritySchema.Enum.NotAplicable:
      return {
        color: "grayscale.white",
        backgroundColor: "grayscale.800",
        label: "No aplica",
      };

    default:
      throw new Error("Route alert severity not valid");
  }
};

export default routeAlertSeverity;
