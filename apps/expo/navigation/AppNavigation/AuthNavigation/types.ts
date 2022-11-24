import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum AuthNavigationRoutes {
  Login = "Login",
  EnterEmail = "EnterEmail",
}

export type AuthNavigationNavigationParamList = {
  [AuthNavigationRoutes.Login]: undefined;
  [AuthNavigationRoutes.EnterEmail]: undefined;
};

export type AuthNavigationRouteProps<T extends AuthNavigationRoutes> =
  RouteProp<AuthNavigationNavigationParamList, T>;

export type AuthNavigationNavigationProps<T extends AuthNavigationRoutes> =
  StackNavigationProp<AuthNavigationNavigationParamList, T>;

export interface AuthNavigationScreenProps<T extends AuthNavigationRoutes> {
  navigation: AuthNavigationNavigationProps<T>;
  route: AuthNavigationRouteProps<T>;
}
