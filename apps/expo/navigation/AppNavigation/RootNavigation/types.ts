import { ClimbsNavigationNavigationParamList } from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationParamList } from "@features/routesManager/Navigation/types";
import { UserNavigationParamList } from "@features/user/Navigation/types";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum RootNavigationRoutes {
  Climbs = "ClimbsStack",
  RouteManager = "RouteManagerStack",
  User = "UserStack",
  FirstTimeLogin = "FirstTimeLogin",
  Loading = "RootLoading",
}

export type RootNavigationNavigationParamList = {
  [RootNavigationRoutes.Climbs]: NavigatorScreenParams<ClimbsNavigationNavigationParamList>;
  [RootNavigationRoutes.RouteManager]: NavigatorScreenParams<RoutesManagerNavigationParamList>;
  [RootNavigationRoutes.FirstTimeLogin]: undefined;
  [RootNavigationRoutes.User]: NavigatorScreenParams<UserNavigationParamList>;
  [RootNavigationRoutes.Loading]: undefined;
};

export type RootNavigationRouteProps<T extends RootNavigationRoutes> =
  RouteProp<RootNavigationNavigationParamList, T>;

export type RootNavigationNavigationProps<T extends RootNavigationRoutes> =
  StackNavigationProp<RootNavigationNavigationParamList, T>;

export interface RootNavigationScreenProps<T extends RootNavigationRoutes> {
  navigation: RootNavigationNavigationProps<T>;
  route: RootNavigationRouteProps<T>;
}
