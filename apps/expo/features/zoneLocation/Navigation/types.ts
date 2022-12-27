import { Zone } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ZoneLocationRoutes {
  ZoneMap = "ZoneMap",
}

export type ZoneLocationNavigationParamList = {
  [ZoneLocationRoutes.ZoneMap]: { zoneId: Zone["id"] };
};

export type ZoneLocationRouteProps<T extends ZoneLocationRoutes> = RouteProp<
  ZoneLocationNavigationParamList,
  T
>;

export type ZoneLocationNavigationProps<T extends ZoneLocationRoutes> =
  StackNavigationProp<ZoneLocationNavigationParamList, T>;

export interface ZoneLocationScreenProps<T extends ZoneLocationRoutes> {
  navigation: ZoneLocationNavigationProps<T>;
  route: ZoneLocationRouteProps<T>;
}
