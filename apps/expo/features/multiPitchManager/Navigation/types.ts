import { MultiPitch, Zone } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum MultiPitchManagerRoutes {
  MultiPitchManager = "MultiPitchManager",
}

export type MultiPitchManagerNavigationParamList = {
  [MultiPitchManagerRoutes.MultiPitchManager]: {
    multiPitchId: MultiPitch["id"];
    multiPitchName: MultiPitch["name"];
    zoneId: Zone["id"];
  };
};

export type MultiPitchManagerRouteProps<T extends MultiPitchManagerRoutes> =
  RouteProp<MultiPitchManagerNavigationParamList, T>;

export type MultiPitchManagerNavigationProps<
  T extends MultiPitchManagerRoutes,
> = StackNavigationProp<MultiPitchManagerNavigationParamList, T>;

export interface MultiPitchManagerScreenProps<
  T extends MultiPitchManagerRoutes,
> {
  navigation: MultiPitchManagerNavigationProps<T>;
  route: MultiPitchManagerRouteProps<T>;
}
