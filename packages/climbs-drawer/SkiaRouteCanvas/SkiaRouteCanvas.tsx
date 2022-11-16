import {
  Canvas,
  SkiaMutableValue,
  useMultiTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import { FC } from "react";
import { Dimensions, Platform } from "react-native";

import { GestureHandler } from "../GestureHandler/GestureHandler";
import { Picture } from "../SkiaPicture/SkiaPicture";
import useCacheImage from "../useCacheImage/useCacheImage";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

interface Props {
  imageUrl: string;
  height: number;
  width: number;
  scale?: number;
  canvas?: { height: number; width: number };
  coords?: SkiaMutableValue<{
    x: number;
    y: number;
  }>;
}

const SkiaRouteCanvas: FC<Props> = ({
  imageUrl,
  height,
  width,
  children,
  coords,
}) => {
  const touchHandler = useMultiTouchHandler({
    onEnd: ({ x, y, id }) => {
      if (coords) {
        const isXOutOfBound = Math.abs(x) > width;
        const isYOutOfBound = Math.abs(y) > height;

        if (
          isXOutOfBound ||
          isYOutOfBound ||
          (Platform.OS === "android" && id > 0)
        ) {
          return;
        }
        coords.current = { x, y };
      }
    },
  });

  const image = useCacheImage(imageUrl);

  if (image)
    return (
      <GestureHandler height={height} width={width}>
        <Canvas
          style={{
            height,
            width,
          }}
          onTouch={touchHandler}
        >
          <Picture height={height} width={width} image={image} />
          {children}
        </Canvas>
      </GestureHandler>
    );

  return null;
};

export default SkiaRouteCanvas;
