import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Zone } from '@prisma/client';

export enum RootNavigationRoutes {
  ZonesList = 'ZonesList',
  Zone = 'Zone',
}

export type RootNavigationNavigationParamList = {
  [RootNavigationRoutes.ZonesList]: undefined;
  [RootNavigationRoutes.Zone]: { zoneId: Zone['id']; zoneName: Zone['name'] };
};

export type RootNavigationRouteProps<T extends RootNavigationRoutes> =
  RouteProp<RootNavigationNavigationParamList, T>;

export type RootNavigationNavigationProps<T extends RootNavigationRoutes> =
  StackNavigationProp<RootNavigationNavigationParamList, T>;

export interface RootNavigationScreenProps<T extends RootNavigationRoutes> {
  navigation: RootNavigationNavigationProps<T>;
  route: RootNavigationRouteProps<T>;
}
