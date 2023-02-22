import pointInRoute from "@andescalada/climbs-drawer/pointInRoute";
import type { SkiaValue, SkPoint } from "@shopify/react-native-skia";

const selectRouteByPoint = (
  routes: SkiaValue<{ pathToVector: SkPoint[]; routeId: string }[]>,
  point: SkPoint,
) => {
  const selectedRoute = routes.current.find((route) => {
    return pointInRoute({
      path: route.pathToVector,
      point,
    });
  });

  return selectedRoute?.routeId;
};

export default selectRouteByPoint;
