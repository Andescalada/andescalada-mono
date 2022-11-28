import {
  SkPoint,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";

export const pathToArray = (path: string | undefined | null) => {
  if (!path) return [];
  return path
    .split(" ")
    .map((s) => s.split(","))
    .map((s) => s.map((j) => parseInt(j, 10)));
};

export const pathToVector = (path: string | undefined, scale = 1) => {
  const points = pathToArray(path);
  return points.map((p) => vec(p[0] * scale, p[1] * scale));
};

const usePathToPoints = (path: string | undefined, scale = 1) => {
  const points = useValue<SkPoint[]>([]);
  const start = useValue<SkPoint>(vec(0, 0));
  const end = useValue<SkPoint>(vec(0, 0));

  useComputedValue(() => {
    if (!path) return points;

    points.current = pathToVector(path, scale);
  }, [path]);

  useComputedValue(() => {
    if (points.current.length > 0) start.current = points.current[0];
  }, [points]);
  useComputedValue(() => {
    if (points.current.length > 1)
      end.current = points.current[points.current.length - 1];
  }, [points]);
  return { points, start, end };
};

export default usePathToPoints;
