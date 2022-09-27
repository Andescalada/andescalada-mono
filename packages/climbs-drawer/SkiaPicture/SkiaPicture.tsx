import type { SkImage } from "@shopify/react-native-skia";
import { Image } from "@shopify/react-native-skia";
import React from "react";

interface PictureProps {
  image: SkImage;
  width: number;
  height: number;
}

export const Picture = ({ image, width, height }: PictureProps) => {
  return (
    <Image
      x={0}
      y={0}
      width={width}
      height={height}
      image={image}
      fit="cover"
    />
  );
};
