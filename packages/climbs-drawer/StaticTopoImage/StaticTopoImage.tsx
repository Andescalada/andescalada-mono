import { FitBox, Image, rect, useImage } from "@shopify/react-native-skia";
import { memo, ReactNode } from "react";
import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

interface Props {
  children: ReactNode;
  imageUrl: string;
  height: number;
  width: number;

  x?: number;
  y?: number;
}

const StaticTopoImage: React.FC<Props> = ({
  imageUrl,
  height,
  width,

  children,
  x = 0,
  y = 0,
}) => {
  const image = useImage(imageUrl);

  if (imageUrl)
    return (
      <>
        <Image
          x={x}
          y={y}
          height={height}
          width={width}
          image={image}
          fit="contain"
        />
        <FitBox
          src={rect(0, 0, image?.height() || 0, image?.width() || 0)}
          dst={rect(x, y, height, width)}
        >
          {children}
        </FitBox>
      </>
    );

  return null;
};

export default memo(StaticTopoImage);
