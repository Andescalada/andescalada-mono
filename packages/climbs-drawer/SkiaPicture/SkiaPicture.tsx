import type { SkImage } from "@shopify/react-native-skia";
import { Image } from "@shopify/react-native-skia";
import React, { memo } from "react";

interface PictureProps {
  image: SkImage;
  width: number;
  height: number;
}

const Picture = ({ image, width, height }: PictureProps) => {
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

export default memo(Picture);
