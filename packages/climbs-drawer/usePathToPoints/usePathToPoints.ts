import {
  SkPoint,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";

const usePathToPoints = (path: string | undefined, scale = 1) => {
  const points = useValue<SkPoint[]>([]);
  const start = useValue<SkPoint>(vec(0, 0));
  const end = useValue<SkPoint>(vec(0, 0));

  useComputedValue(() => {
    if (!path) return points;
    const array = path
      .split(" ")
      .map((s) => s.split(","))
      .map((s) => s.map((j) => parseInt(j, 10)));

    points.current = array.map((p) => vec(p[0] * scale, p[1] * scale));
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
