import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ZoneDirectionsRoutes {
  ZoneDirections = "ZoneDirections",
}

export type ZoneDirectionsNavigationParamList = {
  [ZoneDirectionsRoutes.ZoneDirections]: undefined;
};

export type ZoneDirectionsRouteProps<T extends ZoneDirectionsRoutes> =
  RouteProp<ZoneDirectionsNavigationParamList, T>;

export type ZoneDirectionsNavigationProps<T extends ZoneDirectionsRoutes> =
  StackNavigationProp<ZoneDirectionsNavigationParamList, T>;

export interface ZoneDirectionsScreenProps<T extends ZoneDirectionsRoutes> {
  navigation: ZoneDirectionsNavigationProps<T>;
  route: ZoneDirectionsRouteProps<T>;
}
