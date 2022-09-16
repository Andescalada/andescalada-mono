import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { Zone, Sector, Wall } from '@prisma/client';

export enum ClimbsNavigationRoutes {
  ZonesList = 'ZonesList',
  Zone = 'Zone',
  AddZone = 'AddZone',
  Sector = 'Sector',
  AddWall = 'AddWall',
  Wall = 'Wall',
  AddRoute = 'AddRoute',
  EditTopo = 'EditTopo',
}

export type ClimbsNavigationNavigationParamList = {
  [ClimbsNavigationRoutes.ZonesList]: undefined;
  [ClimbsNavigationRoutes.Zone]: { zoneId: Zone['id']; zoneName: Zone['name'] };
  [ClimbsNavigationRoutes.AddZone]: { zoneId: Zone['id'] };
  [ClimbsNavigationRoutes.AddWall]: { sectorId: Sector['id'] };
  [ClimbsNavigationRoutes.Sector]: {
    sectorId: Sector['id'];
    zoneId: Zone['id'];
    sectorName: Sector['name'];
  };
  [ClimbsNavigationRoutes.Wall]: {
    wallId: Wall['id'];
    wallName: Wall['name'];
    sectorId: Sector['id'];
  };
  [ClimbsNavigationRoutes.AddRoute]: { wallId: Wall['id'] };
  [ClimbsNavigationRoutes.EditTopo]: { wallId: Wall['id'] };
};

export type ClimbsNavigationRouteProps<T extends ClimbsNavigationRoutes> =
  RouteProp<ClimbsNavigationNavigationParamList, T>;

export type ClimbsNavigationNavigationProps<T extends ClimbsNavigationRoutes> =
  StackNavigationProp<ClimbsNavigationNavigationParamList, T>;

export interface ClimbsNavigationScreenProps<T extends ClimbsNavigationRoutes> {
  navigation: ClimbsNavigationNavigationProps<T>;
  route: ClimbsNavigationRouteProps<T>;
}
