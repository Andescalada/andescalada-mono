import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum OnboardingRoutes {
  UsernameAndImage = "OnboardingUsernameAndImage",
  FirstTimeGradingSystem = "OnboardingFirstTimeGradingSystem",
}

export type OnboardingNavigationParamList = {
  [OnboardingRoutes.UsernameAndImage]: undefined;
  [OnboardingRoutes.FirstTimeGradingSystem]: undefined;
};

export type OnboardingRouteProps<T extends OnboardingRoutes> = RouteProp<
  OnboardingNavigationParamList,
  T
>;

export type OnboardingNavigationProps<T extends OnboardingRoutes> =
  StackNavigationProp<OnboardingNavigationParamList, T>;

export interface OnboardingScreenProps<T extends OnboardingRoutes> {
  navigation: OnboardingNavigationProps<T>;
  route: OnboardingRouteProps<T>;
}
