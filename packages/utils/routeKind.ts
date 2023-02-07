import { RouteKindSchema } from "@andescalada/db/zod";
import { Colors } from "@andescalada/ui";

const RouteKind = RouteKindSchema.Enum;

export const routeKindLabel = (
  routeKind: typeof RouteKindSchema._type,
): { long: string; short: string; color: Colors } => {
  switch (routeKind) {
    case RouteKind.Boulder:
      return { short: "Bldr", long: "Boulder", color: "boulderRoutes" };
    case RouteKind.Trad:
      return { short: "Trad", long: "Tradicional", color: "tradRoutes" };
    case RouteKind.Sport:
      return { short: "Depo", long: "Deportiva", color: "sportRoutes" };
    case RouteKind.Ice:
      return { short: "Hielo", long: "Hielo", color: "iceRoutes" };
    case RouteKind.Mixed:
      return { short: "Mixta", long: "Mixta", color: "mixedRoutes" };
    case RouteKind.Aid:
      return { short: "Artf", long: "Artificial", color: "aidRoutes" };
    default:
      throw new Error("Invalid route kind");
  }
};
