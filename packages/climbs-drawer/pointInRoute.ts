import type { SkPoint } from "@shopify/react-native-skia";

import { roundPoint } from "./utils";

const pointInRoute = ({
  path: pathArg,
  point,
  threshold = 1,
  roundPointDecimal,
}: {
  path: SkPoint[];
  point: SkPoint;
  threshold?: number;
  roundPointDecimal?: number;
}) => {
  const pathLength = pathArg.length;
  const path = pathArg.map((p: SkPoint) => roundPoint(p, roundPointDecimal));
  const pt3 = roundPoint(point, roundPointDecimal);

  const distances = { dx: 1000000, dy: 100000 };

  const isPointInRoute = path.some((pt1: SkPoint, index: number) => {
    if (index === pathLength - 1) return false;
    const pt2 = path[index + 1] as SkPoint;

    const dx = (pt3.x - pt1.x) / (pt2.x - pt1.x);
    const dy = (pt3.y - pt1.y) / (pt2.y - pt1.y);

    distances.dx = dx;
    distances.dy = dy;

    const betweenX = -threshold <= dx && dx <= threshold;
    const betweenY = -threshold <= dy && dy <= threshold;

    return betweenX && betweenY;
  });

  return { isPointInRoute, distances };
};

export default pointInRoute;
