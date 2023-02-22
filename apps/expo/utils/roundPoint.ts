const roundPoint = (point: { x: number; y: number }, r = 1) => ({
  x: Number(point.x.toFixed(r)),
  y: Number(point.y.toFixed(r)),
});

export default roundPoint;
