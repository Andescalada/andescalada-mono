import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum ErrorRoutes {
  FallbackError = "FallbackError",
}

export type ErrorNavigationParamList = {
  [ErrorRoutes.FallbackError]: undefined;
};

export type ErrorRouteProps<T extends ErrorRoutes> = RouteProp<
  ErrorNavigationParamList,
  T
>;

export type ErrorNavigationProps<T extends ErrorRoutes> = StackNavigationProp<
  ErrorNavigationParamList,
  T
>;

export interface ErrorScreenProps<T extends ErrorRoutes> {
  navigation: ErrorNavigationProps<T>;
  route: ErrorRouteProps<T>;
}
