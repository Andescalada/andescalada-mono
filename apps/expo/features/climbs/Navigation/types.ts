import type { Route, Sector, Wall, Zone } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParseGrade } from "@utils/parseGrade";

export enum ClimbsNavigationRoutes {
  ZonesList = "ZonesList",
  Zone = "Zone",
  AddSector = "AddSector",
  Sector = "Sector",
  AddWall = "AddWall",
  Wall = "Wall",
  AddRoute = "AddRoute",
  UserZones = "UserZones",
  SearchClimbs = "SearchClimbs",
  OfflineZones = "OfflineZones",
  Home = "Home",
  RouteOptions = "RouteOptions",
}

export type ClimbsNavigationNavigationParamList = {
  [ClimbsNavigationRoutes.ZonesList]: undefined;
  [ClimbsNavigationRoutes.UserZones]: undefined;
  [ClimbsNavigationRoutes.OfflineZones]: undefined;
  [ClimbsNavigationRoutes.Home]: undefined;
  [ClimbsNavigationRoutes.SearchClimbs]: undefined;
  [ClimbsNavigationRoutes.Zone]: { zoneId: Zone["id"]; zoneName: Zone["name"] };
  [ClimbsNavigationRoutes.AddSector]: { zoneId: Zone["id"] };
  [ClimbsNavigationRoutes.AddWall]: {
    sectorId: Sector["id"];
    zoneId: Zone["id"];
  };
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
  [ClimbsNavigationRoutes.AddRoute]: {
    wallId: Wall["id"];
    zoneId: Zone["id"];
    name?: Route["name"];
    kind?: Route["kind"];
    grade?: ParseGrade;
    id?: Route["id"];
    unknownName?: Route["unknownName"];
  };
  [ClimbsNavigationRoutes.RouteOptions]: {
    routeId: Route["id"];
    wallId: Wall["id"];
    zoneId: Zone["id"];
  };
};

export type ClimbsNavigationRouteProps<T extends ClimbsNavigationRoutes> =
  RouteProp<ClimbsNavigationNavigationParamList, T>;

export type ClimbsNavigationNavigationProps<T extends ClimbsNavigationRoutes> =
  StackNavigationProp<ClimbsNavigationNavigationParamList, T>;

export interface ClimbsNavigationScreenProps<T extends ClimbsNavigationRoutes> {
  navigation: ClimbsNavigationNavigationProps<T>;
  route: ClimbsNavigationRouteProps<T>;
}
