import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum PhotoContestRoutes {
  ZonesList = "PhotoContestZonesList",
  Zone = "PhotoContestZone",
  UploadTopo = "PhotoContestUploadTopo",
  RouteList = "PhotoContestRouteList",
}

export type PhotoContestNavigationParamList = {
  [PhotoContestRoutes.ZonesList]: undefined;
  [PhotoContestRoutes.Zone]: { zoneId: string; zoneName: string };
  [PhotoContestRoutes.UploadTopo]: {
    wallId: string;
    wallName: string;
    zoneId: string;
  };
  [PhotoContestRoutes.RouteList]: {
    wallId: string;
    wallName: string;
    zoneId: string;
  };
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
