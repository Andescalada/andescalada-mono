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
  unauthorizedActionForZone: (zoneId: string, action: string) => ({
    code: "UNAUTHORIZED",
    message: `You don't have permission to ${action} for zone with id '${zoneId}'`,
  }),
  unauthorizedAction: (action: string) => ({
    code: "UNAUTHORIZED",
    message: `You don't have permission to ${action}`,
  }),
  userNotFound: (email?: string) => ({
    code: "NOT_FOUND",
    message: email
      ? `No user found with email '${email}'`
      : "No user found in context",
  }),
  notValidStatusFlow: (
    zoneId: string,
    currentStatus: string,
    updateStatus: string,
  ) => ({
    code: "BAD_REQUEST",
    message: `Zone ${zoneId} is in status ${currentStatus} and cannot be updated to ${updateStatus}`,
  }),
});

export default error;
