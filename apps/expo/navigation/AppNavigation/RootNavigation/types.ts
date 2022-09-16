import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClimbsNavigationNavigationParamList } from '@features/climbs/Navigation/types';
import { RouteManagerNavigationParamList } from '@features/routesManager/Navigation/types';

export enum RootNavigationRoutes {
  Climbs = 'ClimbsStack',
  RouteManager = 'RouteManagerStack',
}

export type RootNavigationNavigationParamList = {
  [RootNavigationRoutes.Climbs]: NavigatorScreenParams<ClimbsNavigationNavigationParamList>;
  [RootNavigationRoutes.RouteManager]: NavigatorScreenParams<RouteManagerNavigationParamList>;
};

export type RootNavigationRouteProps<T extends RootNavigationRoutes> =
  RouteProp<RootNavigationNavigationParamList, T>;

export type RootNavigationNavigationProps<T extends RootNavigationRoutes> =
  StackNavigationProp<RootNavigationNavigationParamList, T>;

export interface RootNavigationScreenProps<T extends RootNavigationRoutes> {
  navigation: RootNavigationNavigationProps<T>;
  route: RootNavigationRouteProps<T>;
}
