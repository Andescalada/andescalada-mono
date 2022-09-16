import type { Route, Wall } from '@prisma/client';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export enum RouteManagerNavigationRoutes {
  SelectRouteToDraw = 'SelectRouteToDraw',
  DrawRoute = 'DrawRoute',
}

export type RouteManagerNavigationParamList = {
  [RouteManagerNavigationRoutes.SelectRouteToDraw]: {
    wallId: Wall['id'];
  };
  [RouteManagerNavigationRoutes.DrawRoute]: {
    route: { id: Route['id']; position: Route['position'] };
  };
};

export type RouteManagerRouteProps<T extends RouteManagerNavigationRoutes> =
  RouteProp<RouteManagerNavigationParamList, T>;

export type RouteManagerNavigationProps<
  T extends RouteManagerNavigationRoutes,
> = StackNavigationProp<RouteManagerNavigationParamList, T>;

export interface RouteManagerScreenProps<
  T extends RouteManagerNavigationRoutes,
> {
  navigation: RouteManagerNavigationProps<T>;
  route: RouteManagerRouteProps<T>;
}
