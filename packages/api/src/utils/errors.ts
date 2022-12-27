import { TRPCError } from "@trpc/server";

type Error = Omit<TRPCError, "name">;

type Value = Error | ((...arg: string[]) => Error);

const satisfies =
  <T>() =>
  <U extends T>(u: U) =>
    u;

const error = satisfies<Record<string, Value>>()({
  noAccessToZone: (zoneId: string) => ({
    code: "UNAUTHORIZED",
    message: "You don't have access to zone with ID " + zoneId,
  }),
  sectorNotFound: (zoneId: string) => ({
    code: "NOT_FOUND",
    message: `No sectors found for the zone with id '${zoneId}'`,
  }),
  zoneNotFound: (zoneId: string) => ({
    code: "NOT_FOUND",
    message: `No sectors found for the zone with id '${zoneId}'`,
  }),
});

export default error;
