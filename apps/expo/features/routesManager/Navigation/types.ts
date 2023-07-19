import type { MultiPitch, Route, Topo, Wall, Zone } from "@andescalada/db";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum RoutesManagerNavigationRoutes {
  RouteDrawer = "RoutesManagerRouteDrawer",
  TopoViewer = "RoutesManagerTopoViewer",
  RouteExtensionDrawer = "RoutesManagerRouteExtension",
  RouteVariantDrawer = "RoutesManagerRouteVariant",
  MultiPitchDrawer = "RoutesManagerMultiPitchDrawer",
  TopoManager = "RoutesManagerTopoManager",
}

export type RoutesManagerNavigationParamList = {
  [RoutesManagerNavigationRoutes.RouteDrawer]: {
    route: {
      id: Route["id"];
      position: Route["position"];
    };
    wallId: Wall["id"];
    topoId: Topo["id"];
    zoneId: Zone["id"];
    singleEdition?: true;
    goBackOnSuccess?: true;
  };
  [RoutesManagerNavigationRoutes.RouteExtensionDrawer]: {
    route: {
      id: Route["id"];
      position: Route["position"];
      extendedRouteId: string;
    };
    zoneId: Zone["id"];
    wallId: Wall["id"];
    topoId: Topo["id"];
  };
  [RoutesManagerNavigationRoutes.RouteVariantDrawer]: {
    route: {
      id: Route["id"];
      position: Route["position"];
      variantRouteId: string;
    };
    zoneId: Zone["id"];
    wallId: Wall["id"];
    topoId: Topo["id"];
  };
  [RoutesManagerNavigationRoutes.MultiPitchDrawer]: {
    route: {
      id: Route["id"];
      position: Route["position"];
    };
    previousPitchId?: Route["id"];
    pitchNumber?: number;
    newPitch?: boolean;
    zoneId: Zone["id"];
    wallId: Wall["id"];
    topoId: Topo["id"];
    multiPitchId: MultiPitch["id"];
    multiPitchName: MultiPitch["name"];
  };
  [RoutesManagerNavigationRoutes.TopoViewer]: {
    topoId: Topo["id"];
    routeId?: Route["id"];
    zoneId: Zone["id"];
  };
  [RoutesManagerNavigationRoutes.TopoManager]: {
    topoId: Topo["id"];
    wallId: Wall["id"];
    zoneId: Zone["id"];
  };
};

export type RoutesManagerRouteProps<T extends RoutesManagerNavigationRoutes> =
  RouteProp<RoutesManagerNavigationParamList, T>;

export type RoutesManagerNavigationProps<
  T extends RoutesManagerNavigationRoutes,
> = StackNavigationProp<RoutesManagerNavigationParamList, T>;

export interface RoutesManagerScreenProps<
  T extends RoutesManagerNavigationRoutes,
> {
  navigation: RoutesManagerNavigationProps<T>;
  route: RoutesManagerRouteProps<T>;
}
