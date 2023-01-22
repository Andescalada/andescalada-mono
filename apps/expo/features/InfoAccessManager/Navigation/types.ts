import { Zone } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum InfoAccessManagerRoutes {
  AcceptAgreements = "InfoAccessManagerAcceptAgreements",
  AgreementsIntro = "InfoAccessManagerAgreementsIntro",
  MembersScreen = "InfoAccessManagerMembersScreen",
  AddZoneRoleToUserScreen = "InfoAccessManagerAddZoneRoleToUserScreen",
  InviteUserToZoneScreen = "InfoAccessManagerInviteUserToZoneScreen",
}

export type InfoAccessManagerNavigationParamList = {
  [InfoAccessManagerRoutes.AcceptAgreements]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [InfoAccessManagerRoutes.AgreementsIntro]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [InfoAccessManagerRoutes.MembersScreen]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [InfoAccessManagerRoutes.AddZoneRoleToUserScreen]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [InfoAccessManagerRoutes.InviteUserToZoneScreen]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
};

export type InfoAccessManagerRouteProps<T extends InfoAccessManagerRoutes> =
  RouteProp<InfoAccessManagerNavigationParamList, T>;

export type InfoAccessManagerNavigationProps<
  T extends InfoAccessManagerRoutes,
> = StackNavigationProp<InfoAccessManagerNavigationParamList, T>;

export interface InfoAccessManagerScreenProps<
  T extends InfoAccessManagerRoutes,
> {
  navigation: InfoAccessManagerNavigationProps<T>;
  route: InfoAccessManagerRouteProps<T>;
}
