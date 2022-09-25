import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const fitContent = (
  {
    height,
    width,
  }: {
    width: number;
    height: number;
  },
  fit: "width" | "height" = "width",
) => {
  const aspectRatio = height / width;
  if (fit === "width") {
    return {
      height: SCREEN_WIDTH * aspectRatio,
      width: SCREEN_WIDTH,
      ratioToOriginal: SCREEN_HEIGHT / (SCREEN_WIDTH * aspectRatio),
    };
  }
  return {
    height: SCREEN_HEIGHT,
    width: SCREEN_HEIGHT / aspectRatio,
    aspectRatio,
    ratioToOriginal: SCREEN_WIDTH / (SCREEN_HEIGHT / aspectRatio),
  };
};
