export const pathToArray = (path: string | undefined | null) => {
  if (!path) return [];
  return path
    .split(" ")
    .map((s) => s.split(","))
    .map((s) => s.map((j) => parseInt(j, 10)));
};

export const scalePathArray = (path: string | undefined, scale = 1) => {
  const points = pathToArray(path);
  // Fix nullability issues by adding null check
  return points.map((p) => [
    p[0] !== undefined ? p[0] * scale : 0,
    p[1] !== undefined ? p[1] * scale : 0,
  ]);
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
  const parts = point.split(",");
  const x = parseFloat(parts[0] || "0");
  const y = parseFloat(parts[1] || "0");
  return { x: x * scale, y: y * scale };
};

// Add roundPoint function to avoid dependency on utils package
export const roundPoint = <T extends { x: number; y: number }>(
  point: T,
  precision = 2,
): T => {
  const factor = Math.pow(10, precision);
  return {
    ...point,
    x: Math.round(point.x * factor) / factor,
    y: Math.round(point.y * factor) / factor,
  };
};

// Add omit function to avoid dependency on utils package
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}
