import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum AuthNavigationRoutes {
  Login = "Login",
  EnterEmail = "EnterEmail",
  EnterCode = "EnterCode",
  EnterPhoneNumber = "EnterPhoneNumber",
}

export type AuthNavigationNavigationParamList = {
  [AuthNavigationRoutes.Login]: undefined;
  [AuthNavigationRoutes.EnterEmail]: undefined;
  [AuthNavigationRoutes.EnterPhoneNumber]: { userId: string } | undefined;
  [AuthNavigationRoutes.EnterCode]:
    | {
        connectionStrategy: "email";
        email: string;
      }
    | {
        connectionStrategy: "sms";
        phoneNumber: string;
      };
};

export type AuthNavigationRouteProps<T extends AuthNavigationRoutes> =
  RouteProp<AuthNavigationNavigationParamList, T>;

export type AuthNavigationNavigationProps<T extends AuthNavigationRoutes> =
  StackNavigationProp<AuthNavigationNavigationParamList, T>;

export interface AuthNavigationScreenProps<T extends AuthNavigationRoutes> {
  navigation: AuthNavigationNavigationProps<T>;
  route: AuthNavigationRouteProps<T>;
}
