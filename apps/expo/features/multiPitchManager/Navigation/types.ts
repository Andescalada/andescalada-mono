import { MultiPitch, Route, Zone } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum MultiPitchManagerRoutes {
  MultiPitchManager = "MultiPitchManager",
  AddPitch = "AddPitch",
}

export type MultiPitchManagerNavigationParamList = {
  [MultiPitchManagerRoutes.MultiPitchManager]: {
    multiPitchId: MultiPitch["id"];
    multiPitchName: MultiPitch["name"];
    zoneId: Zone["id"];
  };
  [MultiPitchManagerRoutes.AddPitch]: {
    multiPitchId: MultiPitch["id"];
    zoneId: Zone["id"];
    lastPitchKind: Route["kind"] | undefined;
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
