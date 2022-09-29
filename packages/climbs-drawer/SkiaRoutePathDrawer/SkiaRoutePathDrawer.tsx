import {
  Group,
  Points,
  SkiaValue,
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

import usePathToPoints from "../usePathToPoints/usePathToPoints";
import EndPointer from "./EndPointer";
import StartPointer from "./StartPointer";

interface Props {
  coords: SkiaValue<{
    x: number;
    y: number;
  }>;
  path?: string;
  withEnd?: boolean;
  withStart?: boolean;
  label?: string;
  color?: string;
  scale?: number;
}

interface Ref {
  undo: () => void;
  finishRoute: (onFinish?: () => void) => void;
  reset: () => void;
  pointsToString: () => string;
}

const SkiaRoutePathDrawer: ForwardRefRenderFunction<Ref, Props> = (
  { coords, path, withEnd, withStart, label = "?", color, scale = 1 },
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
    if (points.current.length > 0 && !drawStart.current) {
      setHasStart(true);
      drawStart.current = true;
      start.current = points.current[0];
    }
  });

  const finishRoute = useCallback(() => {
    end.current = points.current[points.current.length - 1];
    setHasEnd(true);
    drawEnd.current = true;
  }, [drawEnd, end, points]);

  const undo = useCallback(() => {
    if (hasEnd) {
      setHasEnd(false);
      drawEnd.current = false;
    } else if (points.current && points.current.length > 1) {
      points.current = points.current.splice(0, points.current.length - 1);
    } else {
      points.current = [];
      drawStart.current = false;
      setHasStart(false);
    }
  }, [drawEnd, hasEnd, points, drawStart]);

  const reset = useCallback(() => {
    setHasStart(false);
    setHasEnd(false);
    drawStart.current = false;
    drawEnd.current = false;
    points.current = [];
  }, [drawEnd, drawStart, points]);

  const pointsToString = useCallback(() => {
    if (points.current.length < 1) return "0,0";
    const stringifyPoints = points.current
      .map((p) => `${p.x / scale},${p.y / scale}`)
      .join(" ");
    return stringifyPoints;
  }, [points, scale]);

  const strokeWidth = useMemo(() => 21.5 * scale, [scale]);

  useImperativeHandle(ref, () => ({
    undo,
    finishRoute,
    reset,
    pointsToString,
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
      {hasEnd && <EndPointer c={end} color={color} scale={scale} />}
      {hasStart && (
        <StartPointer c={start} label={label} color={color} scale={scale} />
      )}
    </Group>
  );
};

const Route = forwardRef(SkiaRoutePathDrawer);

export type SkiaRouteRef = React.ElementRef<typeof Route>;

export default Route;
