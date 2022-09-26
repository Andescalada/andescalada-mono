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
  useImperativeHandle,
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
}

interface Ref {
  undo: () => void;
  finishRoute: (onFinish?: () => void) => void;
  reset: () => void;
  pointsToString: () => string;
}

const SkiaRoutePathDrawer: ForwardRefRenderFunction<Ref, Props> = (
  { coords, path, withEnd, withStart, label = "?", color },
  ref,
) => {
  const { points, start, end } = usePathToPoints(path);
  const [hasStart, setHasStart] = useState(withStart);
  const [hasEnd, setHasEnd] = useState(withEnd);

  const drawStart = useValue<boolean>(false);
  const drawEnd = useValue<boolean>(false);

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

  const finishRoute = () => {
    end.current = points.current[points.current.length - 1];
    setHasEnd(true);
    drawEnd.current = true;
  };

  useImperativeHandle(ref, () => ({
    undo: () => {
      if (hasEnd) {
        setHasEnd(false);
        drawEnd.current = false;
      } else if (points.current && points.current.length > 1) {
        points.current.pop();
      } else {
        points.current = [];
        setHasStart(false);
      }
    },
    finishRoute,
    reset: () => {
      setHasStart(false);
      setHasEnd(false);
      points.current = [];
    },
    pointsToString: () => {
      if (points.current.length < 1) return "";
      const stringifyPoints = points.current
        .map((p) => `${p.x},${p.y}`)
        .join(" ");
      return stringifyPoints;
    },
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
        strokeWidth={2}
      />
      {hasEnd && <EndPointer c={end} color={color} />}
      {hasStart && <StartPointer c={start} label={label} color={color} />}
    </Group>
  );
};

const Route = forwardRef(SkiaRoutePathDrawer);

export type SkiaRouteRef = React.ElementRef<typeof Route>;

export default Route;
