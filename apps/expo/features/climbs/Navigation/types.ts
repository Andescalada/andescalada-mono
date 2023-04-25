import type { MultiPitch, Route, Sector, Wall, Zone } from "@prisma/client";
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
  AdminZoneOptions = "AdminZoneOptions",
  ZoneAgreementsEditor = "ZoneAgreementsEditor",
  ZoneAgreements = "ZoneAgreements",
  AgreementsIntro = "ClimbsAgreementsIntro",
  AddAndEditDescription = "AddAndEditDescription",
  MultiPitch = "MultiPitchScreen",
  EditRoutePosition = "EditRoutePosition",
}

export type ClimbsNavigationNavigationParamList = {
  [ClimbsNavigationRoutes.ZonesList]: undefined;
  [ClimbsNavigationRoutes.UserZones]: undefined;
  [ClimbsNavigationRoutes.OfflineZones]: undefined;
  [ClimbsNavigationRoutes.Home]: undefined;
  [ClimbsNavigationRoutes.SearchClimbs]: undefined;
  [ClimbsNavigationRoutes.Zone]: { zoneId: Zone["id"]; zoneName: Zone["name"] };
  [ClimbsNavigationRoutes.AddSector]: {
    zoneId: Zone["id"];
    name?: Sector["name"];
    sectorKind?: Sector["sectorKind"];
    sectorId?: Sector["id"];
  };
  [ClimbsNavigationRoutes.AddWall]: {
    sectorId: Sector["id"];
    zoneId: Zone["id"];
    sectorKind: Sector["sectorKind"];
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
    sectorKind: Sector["sectorKind"];
  };
  [ClimbsNavigationRoutes.EditRoutePosition]: {
    wallId: Wall["id"];
    wallName: Wall["name"];
    sectorId: Sector["id"];
    zoneId: Zone["id"];
    sectorKind: Sector["sectorKind"];
  };
  [ClimbsNavigationRoutes.AddRoute]: {
    wallId: Wall["id"];
    zoneId: Zone["id"];
    name?: Route["name"];
    kind?: Route["kind"];
    grade?: ParseGrade;
    id?: Route["id"];
    unknownName?: Route["unknownName"];
    extendedRouteId?: Route["id"];
  };
  [ClimbsNavigationRoutes.RouteOptions]: {
    routeId: Route["id"];
    wallId: Wall["id"];
    zoneId: Zone["id"];
  };
  [ClimbsNavigationRoutes.AdminZoneOptions]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [ClimbsNavigationRoutes.ZoneAgreementsEditor]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [ClimbsNavigationRoutes.ZoneAgreements]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [ClimbsNavigationRoutes.AgreementsIntro]: undefined;
  [ClimbsNavigationRoutes.AddAndEditDescription]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
    description?: string;
  };
  [ClimbsNavigationRoutes.MultiPitch]: {
    multiPitchId: MultiPitch["id"];
    wallId: Wall["id"];
    zoneId: Zone["id"];
    multiPitchName: MultiPitch["name"];
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
