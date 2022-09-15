import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Zone, Sector, Wall } from '@prisma/client';

export enum RootNavigationRoutes {
  ZonesList = 'ZonesList',
  Zone = 'Zone',
  AddZone = 'AddZone',
  Sector = 'Sector',
  AddWall = 'AddWall',
  Wall = 'Wall',
}

export type RootNavigationNavigationParamList = {
  [RootNavigationRoutes.ZonesList]: undefined;
  [RootNavigationRoutes.Zone]: { zoneId: Zone['id']; zoneName: Zone['name'] };
  [RootNavigationRoutes.AddZone]: { zoneId: Zone['id'] };
  [RootNavigationRoutes.AddWall]: { sectorId: Sector['id'] };
  [RootNavigationRoutes.Sector]: {
    sectorId: Sector['id'];
    zoneId: Zone['id'];
    sectorName: Sector['name'];
  };
  [RootNavigationRoutes.Wall]: {
    wallId: Wall['id'];
    wallName: Wall['name'];
    sectorId: Sector['id'];
  };
};

export type RootNavigationRouteProps<T extends RootNavigationRoutes> =
  RouteProp<RootNavigationNavigationParamList, T>;

export type RootNavigationNavigationProps<T extends RootNavigationRoutes> =
  StackNavigationProp<RootNavigationNavigationParamList, T>;

export interface RootNavigationScreenProps<T extends RootNavigationRoutes> {
  navigation: RootNavigationNavigationProps<T>;
  route: RootNavigationRouteProps<T>;
}
