import { MultiPitch, Pitch, Route, Topo, Wall, Zone } from "@andescalada/db";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParseGrade } from "@utils/parseGrade";

export enum MultiPitchManagerRoutes {
  MultiPitchManager = "MultiPitchManager",
  AddPitch = "AddPitch",
  EditPitch = "EditPitch",
  AddMultiPitch = "AddMultiPitch",
}

export type MultiPitchManagerNavigationParamList = {
  [MultiPitchManagerRoutes.MultiPitchManager]: {
    multiPitchId: MultiPitch["id"];
    multiPitchName: MultiPitch["name"];
    zoneId: Zone["id"];
    topoId?: Topo["id"];
    wallId: Wall["id"];
    drawingOnly?: true;
    goBackOnSuccess?: true;
  };
  [MultiPitchManagerRoutes.AddPitch]: {
    multiPitchId: MultiPitch["id"];
    zoneId: Zone["id"];
    previousPitchKind: Route["kind"] | undefined;
    previousPitchId?: Pitch["id"] | undefined;
    topoId?: Topo["id"];
  };
  [MultiPitchManagerRoutes.EditPitch]: {
    zoneId: Zone["id"];
    kind: Route["kind"];
    grade: ParseGrade;
    routeId: Route["id"];
    pitchId: Pitch["id"];
  };
  [MultiPitchManagerRoutes.AddMultiPitch]: {
    wallId: Wall["id"];
    zoneId: Zone["id"];
    multiPitchName?: MultiPitch["name"];
    unknownName?: MultiPitch["unknownName"];
    multiPitchId?: MultiPitch["id"];
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
