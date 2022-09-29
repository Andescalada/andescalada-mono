import type { User } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum UserNavigationRoutes {
  FirstTimeLogin = "FirstTimeLogin",
}

export type UserNavigationParamList = {
  [UserNavigationRoutes.FirstTimeLogin]: {
    userEmail: User["email"];
  };
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
