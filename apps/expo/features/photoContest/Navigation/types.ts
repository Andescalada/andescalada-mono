import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum PhotoContestRoutes {
  ZonesList = "PhotoContestZonesList",
}

export type PhotoContestNavigationParamList = {
  [PhotoContestRoutes.ZonesList]: undefined;
};

export type PhotoContestRouteProps<T extends PhotoContestRoutes> = RouteProp<
  PhotoContestNavigationParamList,
  T
>;

export type PhotoContestNavigationProps<T extends PhotoContestRoutes> =
  StackNavigationProp<PhotoContestNavigationParamList, T>;

export interface PhotoContestScreenProps<T extends PhotoContestRoutes> {
  navigation: PhotoContestNavigationProps<T>;
  route: PhotoContestRouteProps<T>;
}
