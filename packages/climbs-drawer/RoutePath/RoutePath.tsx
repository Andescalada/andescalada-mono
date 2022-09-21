import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Circle, G, Path, Polyline, Text } from "react-native-svg";

interface Props {
  value?: string | undefined;
  setValue?: (_path: string | undefined) => void;
  label?: number | string;
  disableDrawing?: boolean;
  finished?: boolean;
  routeColor?: string;
  tappedCoords?:
    | {
        x: number;
        y: number;
      }
    | undefined;
}

interface Ref {
  undo: () => void;
  finishRoute: (onFinish?: () => void) => void;
  reset: () => void;
}

const stringToArrayPath = (path: string | undefined) => {
  if (!path) return [];
  const array = path
    .split(" ")
    .map((s) => s.split(","))
    .map((s) => s.map((j) => parseInt(j, 10)));

  return array;
};

const arrayToString = (path: number[][]) => {
  return path.map((a) => `${a[0]},${a[1]}`).join(` `);
};

const RoutePath: React.ForwardRefRenderFunction<Ref, Props> = (
  {
    value,
    setValue,
    disableDrawing = false,
    routeColor = "red",
    tappedCoords,
    finished,
    label = "?",
  },
  ref,
) => {
  const [end, setEnd] = useState<{ x: number; y: number }>();
  const [path, setPath] = useState<number[][]>(stringToArrayPath(value) || []);
  const [stringPath, setStringPath] = useState<string | undefined>(value);
  const [start, setStart] = useState<{ x: number; y: number } | undefined>();

  const finishRoute = useCallback(
    (onFinish?: () => void) => {
      const lastElement = path.length - 1;

      if (lastElement > 1)
        setEnd({ x: path[lastElement][0], y: path[lastElement][1] });
      if (onFinish) onFinish();
    },
    [path],
  );

  useEffect(() => {
    if (path.length > 0) setStart({ x: path[0][0], y: path[0][1] });
  }, [path]);

  useEffect(() => {
    if (finished === true) {
      finishRoute();
    }
  }, [finished, finishRoute]);

  useImperativeHandle(ref, () => ({
    undo: () => {
      const lastElement = path.length - 1;
      if (end) setEnd(undefined);
      else if (lastElement > 0) {
        setPath((prev) => {
          const undoPath = prev.slice(0, lastElement);
          const undoStringPath = arrayToString(undoPath);
          setStringPath(undoStringPath);
          if (setValue) setValue(undoStringPath);
          return undoPath;
        });
      } else {
        setStart(undefined);
        setPath([]);
        setStringPath(undefined);
        if (setValue) setValue(undefined);
      }
    },
    finishRoute,
    reset: () => {
      setStart(undefined);
      setEnd(undefined);
      setPath([]);
      setStringPath(undefined);
      if (setValue) setValue(undefined);
    },
  }));

  useEffect(() => {
    if (disableDrawing) return;
    if (tappedCoords) {
      const lastElement = path[path.length - 1];
      if (!lastElement) {
        setStart({ x: tappedCoords.x, y: tappedCoords.y });
        setPath((prev) => {
          const newPath = [...prev, [tappedCoords.x, tappedCoords.y]];
          const newStringPath = arrayToString(newPath);
          setStringPath(newStringPath);
          if (setValue) setValue(newStringPath);
          return newPath;
        });
      } else if (
        lastElement[0] !== tappedCoords.x &&
        lastElement[1] !== tappedCoords.y &&
        !end
      ) {
        setPath((prev) => {
          const newPath = [...prev, [tappedCoords.x, tappedCoords.y]];
          const newStringPath = arrayToString(newPath);
          setStringPath(newStringPath);
          if (setValue) setValue(newStringPath);
          return newPath;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tappedCoords]);

  return (
    <>
      <Polyline
        points={stringPath}
        fill="none"
        stroke={routeColor}
        strokeWidth={2}
      />
      {start && (
        <G id="start">
          <G>
            <Circle
              cx={start.x}
              cy={start.y}
              r="10"
              fill="white"
              stroke={routeColor}
              strokeWidth={2}
            />
            <Text
              x={start.x}
              y={start.y + 5}
              fill="black"
              fontSize={12}
              stroke={1}
              textAnchor="middle"
            >
              {label}
            </Text>
          </G>
        </G>
      )}
      {end && (
        <G id="start">
          <G>
            <Circle
              cx={end.x}
              cy={end.y}
              r="10"
              fill="white"
              stroke={routeColor}
              strokeWidth={2}
            />
            <Path
              d="M112 268l144 144 144-144M256 392V100"
              strokeWidth={48}
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke={routeColor}
              scale={0.037}
              x={end.x - 9.5}
              y={end.y - 9.5}
            />
          </G>
        </G>
      )}
    </>
  );
};

const Route = React.forwardRef(RoutePath);

export type RouteRef = React.ElementRef<typeof Route>;

export default Route;
