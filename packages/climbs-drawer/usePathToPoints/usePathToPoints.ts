import {
  SkPoint,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { useEffect } from "react";

import { scalePathArray } from "../utils";

export const pathToVector = (path: string | undefined, scale = 1) => {
  const points = scalePathArray(path, scale);
  return points.map((p) => vec(p[0], p[1]));
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
    if (points.current.length > 0) {
      // Ensure we have a valid point
      start.current = points.current[0] || vec(0, 0);
    }
  }, [points]);
  useComputedValue(() => {
    if (points.current.length > 1) {
      // Ensure we have a valid point
      const lastPoint = points.current[points.current.length - 1];
      end.current = lastPoint || vec(0, 0);
    }
  }, [points]);

  useEffect(
    () => () => {
      points.dispose();
      start.dispose();
      end.dispose();
    },
    [],
  );
  return { points, start, end };
};

export default usePathToPoints;
