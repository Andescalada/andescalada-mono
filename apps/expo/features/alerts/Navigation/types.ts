import { Zone } from "@andescalada/db";
import { AddRouteAlertSchema } from "@features/alerts/schemas";
import { RouteAlert } from "@local-database/model";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { z } from "zod";

export const SerializableAddRouteSchema = AddRouteAlertSchema.omit({
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
