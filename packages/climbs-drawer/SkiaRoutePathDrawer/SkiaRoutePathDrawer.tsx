import {
  Group,
  Points,
  SkiaValue,
  SkPoint,
  useValue,
  useValueEffect,
  vec,
} from "@shopify/react-native-skia";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import usePathToPoints, {
  pathToVector,
} from "../usePathToPoints/usePathToPoints";
import EndPointer from "./EndPointer";
import StartPointer from "./StartPointer";

interface Props {
  coords: SkiaValue<{
    x: number;
    y: number;
  }>;
  path?: string;
  defaultEnd?: boolean;
  defaultStart?: boolean;
  label?: string;
  color?: string;
  scale?: number;
  strokeWidth?: number;
  hideStart?: boolean;
}
type GetLabelPosition = ({
  toString,
}: {
  toString: boolean;
}) => string | SkPoint;
interface Ref {
  undo: (softReset?: boolean) => void;
  finishRoute: (onFinish?: () => void) => void;
  reset: () => void;
  pointsToString: () => string;
  getLabelPosition: GetLabelPosition;
  softReset: (path: string) => void;
}

const SkiaRoutePathDrawer: ForwardRefRenderFunction<Ref, Props> = (
  {
    coords,
    path,
    defaultEnd: withEnd,
    defaultStart: withStart,
    label = "?",
    color,
    scale = 1,
    strokeWidth: strokeWidthProp = 1,
    hideStart = false,
  },
  ref,
) => {
  const { points, start, end } = usePathToPoints(path, scale);
  const [hasStart, setHasStart] = useState(withStart);
  const [hasEnd, setHasEnd] = useState(withEnd);

  const drawStart = useValue<boolean>(!!withStart);
  const drawEnd = useValue<boolean>(!!withEnd);

  useValueEffect(coords, () => {
    if (drawEnd.current) return;
    points.current = [
      ...points.current,
      vec(coords.current.x, coords.current.y),
    ];
    if (points.current.length > 0 && !drawStart.current && !hideStart) {
      setHasStart(true);
      drawStart.current = true;
      start.current = points.current[0];
    }
  });

  const finishRoute = useCallback(() => {
    if (points.current.length > 0) {
      end.current = points.current[points.current.length - 1];
      setHasEnd(true);
    }
    drawEnd.current = true;
  }, [drawEnd, end, points]);

  const undo = useCallback(
    (softReset = false) => {
      if (hasEnd) {
        setHasEnd(false);
        drawEnd.current = false;
      } else if (points.current && points.current.length > 1) {
        points.current = points.current.splice(0, points.current.length - 1);
      } else if (points.current.length === 1 && softReset) {
        points.current = [points.current[0]];
      } else {
        points.current = [];
        drawStart.current = false;
        setHasStart(false);
      }
    },
    [drawEnd, hasEnd, points, drawStart],
  );

  const reset = useCallback(() => {
    setHasStart(false);
    setHasEnd(false);
    drawStart.current = false;
    drawEnd.current = false;
    points.current = [];
  }, [drawEnd, drawStart, points]);

  const softReset = useCallback(
    (pathToReset: string) => {
      const path = pathToVector(pathToReset, scale);

      points.current = path;
      start.current = path[0];
      setHasStart(true);
      setHasEnd(false);
      drawStart.current = true;
      drawEnd.current = false;
    },
    [drawEnd, drawStart, points, scale, start],
  );

  const getLabelPosition = useCallback(
    ({ toString }: { toString: boolean }) => {
      if (points.current.length < 1 && toString) return "0,0";
      if (points.current.length < 1) return vec(0, 0);
      const middle = Math.floor(points.current.length / 2);
      const middlePoint = points.current[middle];
      if (!toString) return middlePoint;
      return `${middlePoint.x / scale},${middlePoint.y / scale}`;
    },
    [points, scale],
  );

  const pointsToString = useCallback(() => {
    if (points.current.length < 1) return "0,0";
    const stringifyPoints = points.current
      .map((p) => `${p.x / scale},${p.y / scale}`)
      .join(" ");
    return stringifyPoints;
  }, [points, scale]);

  const strokeWidth = useMemo(
    () => 21.5 * scale * strokeWidthProp,
    [scale, strokeWidthProp],
  );

  useImperativeHandle(ref, () => ({
    undo,
    finishRoute,
    reset,
    pointsToString,
    softReset,
    getLabelPosition,
  }));

  return (
    <Group>
      <Points
        points={points}
        mode="polygon"
        color={color}
        style="stroke"
        strokeJoin={"round"}
        strokeCap="round"
        strokeMiter={1}
        strokeWidth={strokeWidth}
      />
      {hasEnd && (
        <EndPointer c={end} color={color} scale={scale * strokeWidthProp} />
      )}
      {hasStart && (
        <StartPointer
          c={start}
          label={label}
          color={color}
          scale={scale * strokeWidthProp}
        />
      )}
    </Group>
  );
};

const Route = forwardRef(SkiaRoutePathDrawer);

export type SkiaRouteRef = React.ElementRef<typeof Route>;

export default Route;
