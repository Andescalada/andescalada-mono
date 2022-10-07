import type { Route, Topo, Wall } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum RoutesManagerNavigationRoutes {
  SelectRouteToDraw = "SelectRouteToDraw",
  DrawRoute = "DrawRoute",
  TopoViewer = "TopoViewer",
}

export type RoutesManagerNavigationParamList = {
  [RoutesManagerNavigationRoutes.SelectRouteToDraw]: {
    wallId: Wall["id"];
  };
  [RoutesManagerNavigationRoutes.DrawRoute]: {
    route: { id: Route["id"]; position: Route["position"] };
    wallId: Wall["id"];
    topoId: Topo["id"];
  };
  [RoutesManagerNavigationRoutes.TopoViewer]: {
    topoId: Topo["id"];
    routeId?: Route["id"];
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
