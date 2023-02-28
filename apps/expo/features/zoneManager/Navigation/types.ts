import { InfoAccessSchema, SearchVisibilitySchema } from "@andescalada/db/zod";
import { Zone } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ZoneManagerRoutes {
  AddNewZoneScreen = "AddNewZoneScreen",
  EditZone = "EditZone",
  SelectZoneLocation = "SelectZoneLocationScreen",
  ZoneOnboarding = "ZoneOnboarding",
  EditZoneStatus = "EditZoneStatus",
  ZonesByRole = "ZonesByRole",
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
  [ZoneManagerRoutes.EditZone]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
    infoAccess?: typeof InfoAccessSchema._type;
    searchVisibility?: typeof SearchVisibilitySchema._type;
  };
  [ZoneManagerRoutes.ZonesByRole]: undefined;
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
