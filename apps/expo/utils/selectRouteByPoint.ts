import pointInRoute from "@andescalada/climbs-drawer/pointInRoute";
import type { SkiaValue, SkPoint } from "@shopify/react-native-skia";

const selectRouteByPoint = (
  routes: SkiaValue<{ pathToVector: SkPoint[]; routeId: string }[]>,
  point: SkPoint,
) => {
  const lastItemIndex = routes.current.length - 1;

  const selectClosestRoute = routes.current.reduce<{
    distances: { dx: number; dy: number };
    routeId: string | undefined;
  }>(
    (prev, route, index) => {
      const p = pointInRoute({
        path: route.pathToVector,
        point,
        threshold: [0, lastItemIndex].includes(index) ? 1.6 : 1.5,
      });
      if (!p.isPointInRoute) {
        return prev;
      }
      if (
        abs(p.distances.dx, p.distances.dy) <
        abs(prev.distances.dx, prev.distances.dy)
      ) {
        return { distances: p.distances, routeId: route.routeId };
      }
      return prev;
    },
    { distances: { dx: 1_000_000, dy: 1_000_000 }, routeId: undefined },
  );

  return selectClosestRoute?.routeId;
};

export default selectRouteByPoint;

const abs = (x: number, y: number) => Math.abs(x) * Math.abs(y);
