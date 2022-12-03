import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ZoneAgreementsRoutes {
  AgreementsIntro = "AgreementsIntro",
  PetsAgreement = "PetsAgreement",
  CampingAgreement = "CampingAgreement",
}

export type ZoneAgreementsNavigationParamList = {
  [ZoneAgreementsRoutes.AgreementsIntro]: undefined;
  [ZoneAgreementsRoutes.PetsAgreement]: undefined;
  [ZoneAgreementsRoutes.CampingAgreement]: undefined;
};

export type ZoneAgreementsRouteProps<T extends ZoneAgreementsRoutes> =
  RouteProp<ZoneAgreementsNavigationParamList, T>;

export type ZoneAgreementsNavigationProps<T extends ZoneAgreementsRoutes> =
  StackNavigationProp<ZoneAgreementsNavigationParamList, T>;

export interface ZoneAgreementsScreenProps<T extends ZoneAgreementsRoutes> {
  navigation: ZoneAgreementsNavigationProps<T>;
  route: ZoneAgreementsRouteProps<T>;
}
