import { Zone, ZoneDirections } from "@andescalada/db";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ZoneDirectionsRoutes {
  ZoneDirections = "ZoneDirections",
  AddDirections = "AddDirections",
}

export type ZoneDirectionsNavigationParamList = {
  [ZoneDirectionsRoutes.ZoneDirections]: {
    zoneName: Zone["name"];
    zoneId: Zone["id"];
  };
  [ZoneDirectionsRoutes.AddDirections]: {
    zoneName: Zone["name"];
    zoneId: Zone["id"];
    transportationMode?: ZoneDirections["transportationMode"];
    description?: string;
  };
};

export type ZoneDirectionsRouteProps<T extends ZoneDirectionsRoutes> =
  RouteProp<ZoneDirectionsNavigationParamList, T>;

export type ZoneDirectionsNavigationProps<T extends ZoneDirectionsRoutes> =
  StackNavigationProp<ZoneDirectionsNavigationParamList, T>;

export interface ZoneDirectionsScreenProps<T extends ZoneDirectionsRoutes> {
  navigation: ZoneDirectionsNavigationProps<T>;
  route: ZoneDirectionsRouteProps<T>;
}
