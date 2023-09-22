import { Route, Sector, Zone } from "@andescalada/db";
import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import { RouteAlert } from "@local-database/model";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { z } from "zod";

export const AddRouteSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  kind: RouteAlertKindSchema,
  severity: RouteAlertSeveritySchema,
  dueDate: z.date().optional(),
  route: z
    .object({ id: z.string(), name: z.string(), sectorName: z.string() })
    .optional(),
});

export const SerializableAddRouteSchema = AddRouteSchema.omit({
  dueDate: true,
}).extend({
  dueDate: z.number().optional(),
});

export enum AlertsRoutes {
  AddRouteAlert = "Alert-AddRouteAlert",
  RouteAlertsList = "Alert-RouteAlertsList",
  RouteAlert = "Alert-RouteAlert",
}

export type AlertsNavigationParamList = {
  [AlertsRoutes.AddRouteAlert]: {
    zoneId: Zone["id"];
    defaultValues?: Partial<z.infer<typeof SerializableAddRouteSchema>>;
  };
  [AlertsRoutes.RouteAlertsList]: {
    zoneId: Zone["id"];
  };
  [AlertsRoutes.RouteAlert]: {
    routeAlertId: RouteAlert["id"];
    zoneId: Zone["id"];
    isSynced?: boolean;
  };
};

export type AlertsRouteProps<T extends AlertsRoutes> = RouteProp<
  AlertsNavigationParamList,
  T
>;

export type AlertsNavigationProps<T extends AlertsRoutes> = StackNavigationProp<
  AlertsNavigationParamList,
  T
>;

export interface AlertsScreenProps<T extends AlertsRoutes> {
  navigation: AlertsNavigationProps<T>;
  route: AlertsRouteProps<T>;
}
