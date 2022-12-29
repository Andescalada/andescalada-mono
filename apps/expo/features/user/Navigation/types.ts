import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum UserNavigationRoutes {
  OwnUserConfig = "UserConfig",
  GradingSystem = "GradingSystem",
  PersonalInfo = "PersonalInfo",
  CreateZone = "CreateZone",
  ManageUserRoles = "ManageUserRoles",
  ZoneReviewManager = "ZoneReviewManager",
}

export type UserNavigationParamList = {
  [UserNavigationRoutes.OwnUserConfig]: undefined;
  [UserNavigationRoutes.GradingSystem]: undefined;
  [UserNavigationRoutes.PersonalInfo]: undefined;
  [UserNavigationRoutes.CreateZone]: undefined;
  [UserNavigationRoutes.ManageUserRoles]: undefined;
  [UserNavigationRoutes.ZoneReviewManager]: undefined;
};

export type UserRouteProps<T extends UserNavigationRoutes> = RouteProp<
  UserNavigationParamList,
  T
>;

export type UserNavigationProps<T extends UserNavigationRoutes> =
  StackNavigationProp<UserNavigationParamList, T>;

export interface UserNavigationScreenProps<T extends UserNavigationRoutes> {
  navigation: UserNavigationProps<T>;
  route: UserRouteProps<T>;
}
