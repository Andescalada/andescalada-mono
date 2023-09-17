import { Route, Zone } from "@andescalada/db";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum AlertsRoutes {
  AddRouteAlert = "Alert-AddRouteAlert",
}

export type AlertsNavigationParamList = {
  [AlertsRoutes.AddRouteAlert]: {
    zoneId: Zone["id"];
    routeId?: Route["id"];
    routeName?: Route["name"];
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
