import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ZoneManagerRoutes {
  AddNewZoneScreen = "AddNewZoneScreen",
}

export type ZoneManagerNavigationParamList = {
  [ZoneManagerRoutes.AddNewZoneScreen]: undefined;
};

export type ZoneManagerRouteProps<T extends ZoneManagerRoutes> = RouteProp<
  ZoneManagerNavigationParamList,
  T
>;

export type ZoneManagerNavigationProps<T extends ZoneManagerRoutes> =
  StackNavigationProp<ZoneManagerNavigationParamList, T>;

export interface ZoneManagerScreenProps<T extends ZoneManagerRoutes> {
  navigation: ZoneManagerNavigationProps<T>;
  route: ZoneManagerRouteProps<T>;
}
