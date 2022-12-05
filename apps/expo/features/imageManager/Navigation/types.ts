import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ComponentProps } from "react";
import { Image } from "react-native";

export enum ImageManagerRoutes {
  ImageViewer = "ImageViewer",
}

export type ImageManagerNavigationParamList = {
  [ImageManagerRoutes.ImageViewer]: ComponentProps<typeof Image>;
};

export type ImageManagerRouteProps<T extends ImageManagerRoutes> = RouteProp<
  ImageManagerNavigationParamList,
  T
>;

export type ImageManagerNavigationProps<T extends ImageManagerRoutes> =
  StackNavigationProp<ImageManagerNavigationParamList, T>;

export interface ImageManagerScreenProps<T extends ImageManagerRoutes> {
  navigation: ImageManagerNavigationProps<T>;
  route: ImageManagerRouteProps<T>;
}
