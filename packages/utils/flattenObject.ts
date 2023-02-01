export const flattenObject = <T extends Record<string, string | object>>(
  ob: T,
  prefix = false,
  result: Record<FlattenObjectKeys<T>, string> | null = null,
): Record<FlattenObjectKeys<T>, string> => {
  // @ts-expect-error result has more keys than ob
  result = result || {};

  // Preserve empty objects and arrays, they are lost otherwise
  if (
    prefix &&
    typeof ob === "object" &&
    ob !== null &&
    Object.keys(ob).length === 0
  ) {
    // @ts-expect-error ref is correctly typed
    result[prefix] = Array.isArray(ob) ? [] : {};
    // @ts-expect-error ref is correctly typed
    return result;
  }
  // @ts-expect-error ref is correctly typed
  prefix = prefix ? prefix + "." : "";

  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      if (typeof ob[i] === "object" && ob[i] !== null) {
        // @ts-expect-error ref is correctly typed
        flattenObject(ob[i], prefix + i, result);
      } else {
        // @ts-expect-error ref is correctly typed
        result[prefix + i] = ob[i];
      }
    }
  }
  // @ts-expect-error ref is correctly typed
  return result;
};

export type FlattenObjectKeys<
  T extends Record<string, unknown>,
  Key = keyof T,
> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${FlattenObjectKeys<T[Key]>}`
    : `${Key}`
  : never;
