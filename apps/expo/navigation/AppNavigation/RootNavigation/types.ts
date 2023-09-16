import { AlertsNavigationParamList } from "@features/alerts/Navigation/types";
import { ClimbsNavigationNavigationParamList } from "@features/climbs/Navigation/types";
import { ErrorNavigationParamList } from "@features/error/Navigation/types";
import { ImageManagerNavigationParamList } from "@features/imageManager/Navigation/types";
import { InfoAccessManagerNavigationParamList } from "@features/InfoAccessManager/Navigation/types";
import { MultiPitchManagerNavigationParamList } from "@features/multiPitchManager/Navigation/types";
import { OnboardingNavigationParamList } from "@features/onboarding/Navigation/types";
import { PhotoContestNavigationParamList } from "@features/photoContest/Navigation/types";
import { RoutesManagerNavigationParamList } from "@features/routesManager/Navigation/types";
import { UserNavigationParamList } from "@features/user/Navigation/types";
import { ZoneAgreementsNavigationParamList } from "@features/zoneAgreementManager/Navigation/types";
import { ZoneDirectionsNavigationParamList } from "@features/zoneDirections/Navigation/types";
import { ZoneLocationNavigationParamList } from "@features/zoneLocation/Navigation/types";
import { ZoneManagerNavigationParamList } from "@features/zoneManager/Navigation/types";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum RootNavigationRoutes {
  Climbs = "RootClimbsStack",
  RouteManager = "RootRouteManagerStack",
  User = "RootUserStack",
  Onboarding = "RootOnboarding",
  Loading = "RootLoading",
  ZoneAgreementsManager = "RootZoneAgreementsManager",
  ImageManager = "RootImageManager",
  ZoneLocation = "RootZoneLocation",
  ZoneDirections = "RootZoneDirections",
  ZoneManager = "RootZoneManager",
  Error = "RootError",
  InfoAccessManager = "RootInfoAccessManager",
  MultiPitchManager = "RootMultiPitchManager",
  PhotoContest = "RootPhotoContest",
  Alert = "RootAlert",
}

export type RootNavigationNavigationParamList = {
  [RootNavigationRoutes.Climbs]: NavigatorScreenParams<ClimbsNavigationNavigationParamList>;
  [RootNavigationRoutes.RouteManager]: NavigatorScreenParams<RoutesManagerNavigationParamList>;
  [RootNavigationRoutes.Onboarding]: NavigatorScreenParams<OnboardingNavigationParamList>;
  [RootNavigationRoutes.User]: NavigatorScreenParams<UserNavigationParamList>;
  [RootNavigationRoutes.Loading]: undefined;
  [RootNavigationRoutes.ZoneAgreementsManager]: NavigatorScreenParams<ZoneAgreementsNavigationParamList>;
  [RootNavigationRoutes.ImageManager]: NavigatorScreenParams<ImageManagerNavigationParamList>;
  [RootNavigationRoutes.ZoneLocation]: NavigatorScreenParams<ZoneLocationNavigationParamList>;
  [RootNavigationRoutes.ZoneDirections]: NavigatorScreenParams<ZoneDirectionsNavigationParamList>;
  [RootNavigationRoutes.ZoneManager]: NavigatorScreenParams<ZoneManagerNavigationParamList>;
  [RootNavigationRoutes.Error]: NavigatorScreenParams<ErrorNavigationParamList>;
  [RootNavigationRoutes.InfoAccessManager]: NavigatorScreenParams<InfoAccessManagerNavigationParamList>;
  [RootNavigationRoutes.MultiPitchManager]: NavigatorScreenParams<MultiPitchManagerNavigationParamList>;
  [RootNavigationRoutes.PhotoContest]: NavigatorScreenParams<PhotoContestNavigationParamList>;
  [RootNavigationRoutes.Alert]: NavigatorScreenParams<AlertsNavigationParamList>;
};

export type RootNavigationRouteProps<T extends RootNavigationRoutes> =
  RouteProp<RootNavigationNavigationParamList, T>;

export type RootNavigationNavigationProps<T extends RootNavigationRoutes> =
  StackNavigationProp<RootNavigationNavigationParamList, T>;

export interface RootNavigationScreenProps<T extends RootNavigationRoutes> {
  navigation: RootNavigationNavigationProps<T>;
  route: RootNavigationRouteProps<T>;
}
