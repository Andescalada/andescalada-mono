import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Zone } from '@prisma/client';

export enum RootNavigationRoutes {
  ZonesList = 'ZonesList',
  Zone = 'Zone',
  AddZone = 'AddZone',
}

export type RootNavigationNavigationParamList = {
  [RootNavigationRoutes.ZonesList]: undefined;
  [RootNavigationRoutes.Zone]: { zoneId: Zone['id']; zoneName: Zone['name'] };
  [RootNavigationRoutes.AddZone]: { zoneId: Zone['id'] };
};

export type RootNavigationRouteProps<T extends RootNavigationRoutes> =
  RouteProp<RootNavigationNavigationParamList, T>;

export type RootNavigationNavigationProps<T extends RootNavigationRoutes> =
  StackNavigationProp<RootNavigationNavigationParamList, T>;

export interface RootNavigationScreenProps<T extends RootNavigationRoutes> {
  navigation: RootNavigationNavigationProps<T>;
  route: RootNavigationRouteProps<T>;
}
