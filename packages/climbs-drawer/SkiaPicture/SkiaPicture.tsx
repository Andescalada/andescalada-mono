import type { SkImage } from "@shopify/react-native-skia";
import { Group, Image } from "@shopify/react-native-skia";
import React from "react";

interface PictureProps {
  image: SkImage;
  width: number;
  height: number;
}

export const Picture = ({ image, width, height }: PictureProps) => {
  return (
    <Group>
      <Image
        x={0}
        y={0}
        width={width}
        height={height}
        image={image}
        fit="cover"
      />
    </Group>
  );
};
