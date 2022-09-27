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
  fitTo?: number,
) => {
  const aspectRatio = height / width;

  if (fit === "width") {
    const valueToFit = fitTo !== undefined ? fitTo : SCREEN_WIDTH;
    return {
      height: valueToFit * aspectRatio,
      width: valueToFit,
      aspectRatio,
      scale: valueToFit / width,
    };
  }
  const valueToFit = fitTo !== undefined ? fitTo : SCREEN_HEIGHT;
  return {
    height: valueToFit,
    width: valueToFit / aspectRatio,
    aspectRatio,
    scale: valueToFit / height,
  };
};
