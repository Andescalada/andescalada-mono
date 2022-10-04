import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum UserNavigationRoutes {
  Placeholder = "UserPlaceholder",
}

export type UserNavigationParamList = {
  [UserNavigationRoutes.Placeholder]: undefined;
};

export type UserRouteProps<T extends UserNavigationRoutes> = RouteProp<
  UserNavigationParamList,
  T
>;

export type UserNavigationProps<T extends UserNavigationRoutes> =
  StackNavigationProp<UserNavigationParamList, T>;

export interface UserScreenProps<T extends UserNavigationRoutes> {
  navigation: UserNavigationProps<T>;
  route: UserRouteProps<T>;
}
