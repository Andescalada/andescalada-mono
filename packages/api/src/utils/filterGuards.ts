export function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}

export function notNull<T>(val: T | null): val is T {
  return val !== null;
}
