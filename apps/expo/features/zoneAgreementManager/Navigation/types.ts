import type { Zone, ZoneAgreement } from "@andescalada/db";
import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ZoneAgreementsRoutes {
  AgreementsIntro = "AgreementsIntro",
  PetsAgreement = "PetsAgreement",
  CampingAgreement = "CampingAgreement",
  FireAgreement = "FireAgreement",
  PayAgreement = "PayAgreement",
  ToiletAgreement = "ToiletAgreement",
  EditAgreement = "EditAgreement",
  AddAgreements = "AddAgreements",
  SelectClassicAgreement = "SelectClassicAgreement",
}

export type ZoneAgreementsNavigationParamList = {
  [ZoneAgreementsRoutes.AgreementsIntro]: { zoneId: Zone["id"] };
  [ZoneAgreementsRoutes.PetsAgreement]: { zoneId: Zone["id"] };
  [ZoneAgreementsRoutes.CampingAgreement]: { zoneId: Zone["id"] };
  [ZoneAgreementsRoutes.FireAgreement]: { zoneId: Zone["id"] };
  [ZoneAgreementsRoutes.PayAgreement]: { zoneId: Zone["id"] };
  [ZoneAgreementsRoutes.ToiletAgreement]: { zoneId: Zone["id"] };
  [ZoneAgreementsRoutes.EditAgreement]: {
    zoneId: Zone["id"];
    zoneAgreementId: ZoneAgreement["id"];
  };
  [ZoneAgreementsRoutes.AddAgreements]: {
    zoneId: Zone["id"];
    zoneName: Zone["name"];
  };
  [ZoneAgreementsRoutes.SelectClassicAgreement]: {
    zoneId: Zone["id"];
    classicAgreement: typeof ClassicAgreementSchema._type;
  };
};

export type ZoneAgreementsRouteProps<T extends ZoneAgreementsRoutes> =
  RouteProp<ZoneAgreementsNavigationParamList, T>;

export type ZoneAgreementsNavigationProps<T extends ZoneAgreementsRoutes> =
  StackNavigationProp<ZoneAgreementsNavigationParamList, T>;

export interface ZoneAgreementsScreenProps<T extends ZoneAgreementsRoutes> {
  navigation: ZoneAgreementsNavigationProps<T>;
  route: ZoneAgreementsRouteProps<T>;
}
