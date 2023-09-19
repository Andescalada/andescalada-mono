import type { MultiPitch, Route, Sector, Wall, Zone } from "@andescalada/db";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParseGrade } from "@utils/parseGrade";

export enum ClimbsNavigationRoutes {
  ZonesList = "Climbs-ZonesList",
  Zone = "Climbs-Zone",
  AddSector = "Climbs-AddSector",
  Sector = "Climbs-Sector",
  AddWall = "Climbs-AddWall",
  Wall = "Climbs-Wall",
  Route = "Climbs-Route",
  AddRoute = "Climbs-AddRoute",
  UserZones = "Climbs-UserZones",
  SearchClimbs = "Climbs-SearchClimbs",
  OfflineZones = "Climbs-OfflineZones",
  Home = "Climbs-Home",
  RouteOptions = "Climbs-RouteOptions",
  AdminZoneOptions = "Climbs-AdminZoneOptions",
  ZoneAgreementsEditor = "Climbs-ZoneAgreementsEditor",
  ZoneAgreements = "Climbs-ZoneAgreements",
  AgreementsIntro = "Climbs-ClimbsAgreementsIntro",
  AddAndEditZoneDescription = "Climbs-AddAndEditZoneDescription",
  AddAndEditRouteDescription = "Climbs-AddAndEditRouteDescription",
  MultiPitch = "Climbs-MultiPitchScreen",
  EditRoutePosition = "Climbs-EditRoutePosition",
  VerifyInformation = "Climbs-VerifyInformation",
  OtherTopos = "Climbs-OtherTopos",
  EditWallPositions = "Climbs-EditWallPosition",
}

export type ClimbsNavigationNavigationParamList = {
  [ClimbsNavigationRoutes.ZonesList]: undefined;
  [ClimbsNavigationRoutes.UserZones]: undefined;
  [ClimbsNavigationRoutes.OfflineZones]: undefined;
  [ClimbsNavigationRoutes.Home]: undefined;
  [ClimbsNavigationRoutes.SearchClimbs]: undefined;
  [ClimbsNavigationRoutes.Zone]: { zoneId: Zone["id"]; zoneName: Zone["name"] };
  [ClimbsNavigationRoutes.Route]: {
    zoneId: Zone["id"];
    routeName: Route["name"];
    routeId: Route["id"];
  };
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
  [ClimbsNavigationRoutes.OtherTopos]: {
    zoneId: Zone["id"];
    wallId: Wall["id"];
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
  } & (
    | { extendedRouteId?: Route["id"]; variantRouteId?: never }
    | { variantRouteId?: Route["id"]; extendedRouteId?: never }
  );
  [ClimbsNavigationRoutes.RouteOptions]: {
    routeId: Route["id"];
    wallId: Wall["id"];
    zoneId: Zone["id"];
    isChildrenRoute?: boolean;
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
  [ClimbsNavigationRoutes.AddAndEditZoneDescription]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
    description?: string;
  };
  [ClimbsNavigationRoutes.AddAndEditRouteDescription]: {
    zoneId: Zone["id"];
    routeId: Route["id"];
    description?: string;
  };
  [ClimbsNavigationRoutes.MultiPitch]: {
    multiPitchId: MultiPitch["id"];
    wallId: Wall["id"];
    zoneId: Zone["id"];
    multiPitchName: MultiPitch["name"];
  };
  [ClimbsNavigationRoutes.VerifyInformation]: {
    zoneId: Zone["id"];
  };
  [ClimbsNavigationRoutes.EditWallPositions]: {
    sectorId: Sector["id"];
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
