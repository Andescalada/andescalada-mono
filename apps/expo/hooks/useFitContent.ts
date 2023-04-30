import { useWindowDimensions } from "react-native";

export const useFitContent = (
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
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  fitTo = fitTo || (fit === "width" ? screenWidth : screenHeight);

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
