import { Route, Sector, Zone } from "@andescalada/db";
import { RouteAlert } from "@local-database/model";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum AlertsRoutes {
  AddRouteAlert = "Alert-AddRouteAlert",
  RouteAlertsList = "Alert-RouteAlertsList",
  RouteAlert = "Alert-RouteAlert",
}

export type AlertsNavigationParamList = {
  [AlertsRoutes.AddRouteAlert]: {
    zoneId: Zone["id"];
    routeId?: Route["id"];
    routeName?: Route["name"];
    sectorName?: Sector["name"];
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
