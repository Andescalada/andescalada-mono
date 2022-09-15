import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClimbsNavigationNavigationParamList } from '@navigation/AppNavigation/RootNavigation/ClimbsNavigation/types';

export enum RootNavigationRoutes {
  Climbs = 'ClimbsStack',
}

export type RootNavigationNavigationParamList = {
  [RootNavigationRoutes.Climbs]: NavigatorScreenParams<ClimbsNavigationNavigationParamList>;
};

export type RootNavigationRouteProps<T extends RootNavigationRoutes> =
  RouteProp<RootNavigationNavigationParamList, T>;

export type RootNavigationNavigationProps<T extends RootNavigationRoutes> =
  StackNavigationProp<RootNavigationNavigationParamList, T>;

export interface RootNavigationScreenProps<T extends RootNavigationRoutes> {
  navigation: RootNavigationNavigationProps<T>;
  route: RootNavigationRouteProps<T>;
}
