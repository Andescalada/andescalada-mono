import { vec } from "@shopify/react-native-skia";

export const pathToArray = (path: string | undefined | null) => {
  if (!path) return [];
  return path
    .split(" ")
    .map((s) => s.split(","))
    .map((s) => s.map((j) => parseInt(j, 10)));
};

export const scalePathArray = (path: string | undefined, scale = 1) => {
  const points = pathToArray(path);
  return points.map((p) => [p[0] * scale, p[1] * scale]);
};

export const pathToVector = (path: string | undefined, scale = 1) => {
  const points = scalePathArray(path, scale);
  return points.map((p) => vec(p[0], p[1]));
};
