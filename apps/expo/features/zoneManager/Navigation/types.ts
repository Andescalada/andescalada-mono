import { Location, Sector, Zone } from "@andescalada/db";
import { InfoAccessSchema, SearchVisibilitySchema } from "@andescalada/db/zod";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ZoneManagerRoutes {
  AddNewZoneScreen = "AddNewZoneScreen",
  EditZone = "EditZone",
  SelectZoneLocation = "SelectZoneLocationScreen",
  ZoneOnboarding = "ZoneOnboarding",
  EditZoneStatus = "EditZoneStatus",
  ZonesByRole = "ZonesByRole",
  HowToPublish = "HowToPublish",
  EditZoneLocation = "EditZoneLocation",
  AddOrEditSectorLocation = "AddOrEditSectorLocation",
}

export type ZoneManagerNavigationParamList = {
  [ZoneManagerRoutes.AddNewZoneScreen]: undefined;
  [ZoneManagerRoutes.SelectZoneLocation]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
    skipOnboarding?: boolean;
  };
  [ZoneManagerRoutes.ZoneOnboarding]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [ZoneManagerRoutes.EditZoneStatus]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [ZoneManagerRoutes.HowToPublish]: undefined;
  [ZoneManagerRoutes.EditZone]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
    infoAccess?: typeof InfoAccessSchema._type;
    searchVisibility?: typeof SearchVisibilitySchema._type;
  };
  [ZoneManagerRoutes.ZonesByRole]: undefined;
  [ZoneManagerRoutes.EditZoneLocation]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
    latitude?: Location["latitude"];
    longitude?: Location["longitude"];
  };
  [ZoneManagerRoutes.AddOrEditSectorLocation]: {
    zoneId: Zone["id"];
    sectorId: Sector["id"];
    sectorName: Sector["name"];
    latitude?: Location["latitude"];
    longitude?: Location["longitude"];
    isEdit?: boolean;
  };
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
