import type { Route, Topo, Wall, Zone } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum RoutesManagerNavigationRoutes {
  RouteDrawer = "RouteDrawer",
  TopoViewer = "TopoViewer",
  RouteExtensionDrawer = "RouteExtension",
  MultiPitchDrawer = "MultiPitchDrawer",
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
  };
  [RoutesManagerNavigationRoutes.RouteExtensionDrawer]: {
    route: {
      id: Route["id"];
      position: Route["position"];
      extendedRouteId?: Route["extendedRouteId"];
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
    zoneId: Zone["id"];
    wallId: Wall["id"];
    topoId: Topo["id"];
  };
  [RoutesManagerNavigationRoutes.TopoViewer]: {
    topoId: Topo["id"];
    routeId?: Route["id"];
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
