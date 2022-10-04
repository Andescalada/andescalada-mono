import type { Sector, Wall, Zone } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ClimbsNavigationRoutes {
  ZonesList = "ZonesList",
  Zone = "Zone",
  AddSector = "AddSector",
  Sector = "Sector",
  AddWall = "AddWall",
  Wall = "Wall",
  AddRoute = "AddRoute",
}

export type ClimbsNavigationNavigationParamList = {
  [ClimbsNavigationRoutes.ZonesList]: undefined;
  [ClimbsNavigationRoutes.Zone]: { zoneId: Zone["id"]; zoneName: Zone["name"] };
  [ClimbsNavigationRoutes.AddSector]: { zoneId: Zone["id"] };
  [ClimbsNavigationRoutes.AddWall]: { sectorId: Sector["id"] };
  [ClimbsNavigationRoutes.Sector]: {
    sectorId: Sector["id"];
    zoneId: Zone["id"];
    sectorName: Sector["name"];
  };
  [ClimbsNavigationRoutes.Wall]: {
    wallId: Wall["id"];
    wallName: Wall["name"];
    sectorId: Sector["id"];
    zoneId: Zone["id"];
  };
  [ClimbsNavigationRoutes.AddRoute]: { wallId: Wall["id"]; zoneId: Zone["id"] };
};

export type ClimbsNavigationRouteProps<T extends ClimbsNavigationRoutes> =
  RouteProp<ClimbsNavigationNavigationParamList, T>;

export type ClimbsNavigationNavigationProps<T extends ClimbsNavigationRoutes> =
  StackNavigationProp<ClimbsNavigationNavigationParamList, T>;

export interface ClimbsNavigationScreenProps<T extends ClimbsNavigationRoutes> {
  navigation: ClimbsNavigationNavigationProps<T>;
  route: ClimbsNavigationRouteProps<T>;
}
