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

export const scalePath = (path: string | undefined, scale = 1) => {
  const points = scalePathArray(path, scale);
  return points.map((p) => p.join(",")).join(" ");
};

export const DEFAULT_POSITION = { x: 0, y: 0 };

export const pointToVector = (
  point: string | undefined = undefined,
  scale: number,
) => {
  if (!point) return DEFAULT_POSITION;
  const [x, y] = point.split(",").map((n) => parseFloat(n));
  return { x: x * scale, y: y * scale };
};
