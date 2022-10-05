/* eslint-disable @typescript-eslint/ban-ts-comment */
export const flattenObject2 = <T extends Record<string, string | object>>(
  obj: T,
  prefix = "",
): Record<FlattenObjectKeys<T>, string> => {
  const flattened: any = {};

  const flatData = [];

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.assign(flattened, flattenObject(obj[key], prefix));
    } else {
      flattened[prefix + key] = obj[key];
    }
  });
  flatData.push(flattened);
  return flattened;
};

export const flattenObject = <T extends Record<string, string | object>>(
  ob: T,
  prefix = false,
  result: Record<FlattenObjectKeys<T>, string> | null = null,
): Record<FlattenObjectKeys<T>, string> => {
  // @ts-ignore
  result = result || {};

  // Preserve empty objects and arrays, they are lost otherwise
  if (
    prefix &&
    typeof ob === "object" &&
    ob !== null &&
    Object.keys(ob).length === 0
  ) {
    // @ts-ignore
    result[prefix] = Array.isArray(ob) ? [] : {};
    // @ts-ignore
    return result;
  }
  // @ts-ignore
  prefix = prefix ? prefix + "." : "";

  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      if (typeof ob[i] === "object" && ob[i] !== null) {
        // @ts-ignore
        flattenObject(ob[i], prefix + i, result);
      } else {
        // @ts-ignore
        result[prefix + i] = ob[i];
      }
    }
  }
  // @ts-ignore
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
