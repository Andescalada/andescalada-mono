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
  notFound: (entity: string, id: string) => ({
    code: "NOT_FOUND",
    message: `No ${entity} found with id '${id}'`,
  }),

  multiPitchNotFound: (multiPitchId: string) => ({
    code: "NOT_FOUND",
    message: `No multi pitch found with id '${multiPitchId}'`,
  }),
  routeNotFound: (routeId: string) => ({
    code: "NOT_FOUND",
    message: `No route found with id '${routeId}'`,
  }),
  sectorNotFound: (sectorId: string) => ({
    code: "NOT_FOUND",
    message: `No sectors  with id '${sectorId}'`,
  }),
  wallNotFound: (wallId: string) => ({
    code: "NOT_FOUND",
    message: `No wall found with id '${wallId}'`,
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
  userNotFound: (id?: string) => ({
    code: "NOT_FOUND",
    message: id ? `No user found with id '${id}'` : "No user found in context",
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
