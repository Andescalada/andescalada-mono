import { MultiPitch, Pitch, Route, Zone } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParseGrade } from "@utils/parseGrade";

export enum MultiPitchManagerRoutes {
  MultiPitchManager = "MultiPitchManager",
  AddPitch = "AddPitch",
  EditPitch = "EditPitch",
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
  [MultiPitchManagerRoutes.EditPitch]: {
    zoneId: Zone["id"];
    kind: Route["kind"];
    grade: ParseGrade;
    routeId: Route["id"];
    pitchId: Pitch["id"];
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
