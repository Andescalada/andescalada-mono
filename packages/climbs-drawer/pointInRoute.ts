import roundPoint from "@andescalada/utils/roundPoint";
import type { SkPoint } from "@shopify/react-native-skia";

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
  const path = pathArg.map(roundPoint);
  const pt3 = roundPoint(point, roundPointDecimal);

  const distances = { dx: 1000000, dy: 100000 };

  const isPointInRoute = path.some((pt1, index) => {
    if (index === pathLength - 1) return false;
    const pt2 = path[index + 1];

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
