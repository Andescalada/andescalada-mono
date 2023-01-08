import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum InfoAccessManagerRoutes {
  AcceptAgreements = "AcceptAgreements",
}

export type InfoAccessManagerNavigationParamList = {
  [InfoAccessManagerRoutes.AcceptAgreements]: undefined;
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
