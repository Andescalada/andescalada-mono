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
  fitTo: number = fit === "width" ? SCREEN_WIDTH : SCREEN_HEIGHT,
) => {
  const aspectRatio = height / width;

  if (fit === "width") {
    return {
      height: fitTo * aspectRatio,
      width: fitTo,
      aspectRatio,
      scale: fitTo / width,
    };
  }

  return {
    height: fitTo,
    width: fitTo / aspectRatio,
    aspectRatio,
    scale: fitTo / height,
  };
};
