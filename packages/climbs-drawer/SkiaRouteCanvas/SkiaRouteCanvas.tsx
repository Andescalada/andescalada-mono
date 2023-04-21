import {
  Canvas,
  SkiaDomView,
  SkiaMutableValue,
  useMultiTouchHandler,
} from "@shopify/react-native-skia";
import { FC, memo, ReactNode, useEffect, useRef } from "react";
import { Dimensions, Platform } from "react-native";

import { GestureHandler } from "../GestureHandler/GestureHandler";
import Picture from "../SkiaPicture/SkiaPicture";
import useCacheImage from "../useCacheImage/useCacheImage";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

interface Props {
  children: ReactNode;
  imageUrl: string;
  height: number;
  width: number;
  center?: boolean;
  disableGesture?: boolean;
  scale?: number;
  canvas?: { height: number; width: number };
  coords?: SkiaMutableValue<{
    x: number;
    y: number;
  }>;
  movement?: SkiaMutableValue<{
    x: number;
    y: number;
  }>;
  disableMovement?: boolean;
}

const SkiaRouteCanvas: FC<Props> = ({
  imageUrl,
  height,
  width,
  children,
  coords,
  disableGesture,
  center,
  movement,
  disableMovement,
}) => {
  const touchHandler = useMultiTouchHandler(
    {
      onStart: ({ x, y }) => {
        if (disableMovement) return;
        if (movement) movement.current = { x, y };
      },
      onActive: ({ x, y }) => {
        if (disableMovement) return;
        if (movement) movement.current = { x, y };
      },
      onEnd: ({ x, y, id }) => {
        if (disableGesture) return;
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
    },
    [disableGesture],
  );

  const image = useCacheImage(imageUrl);

  const ref = useRef<SkiaDomView>(null);

  useEffect(
    () => () => {
      ref.current?.componentWillUnmount();
    },
    [],
  );

  if (image)
    return (
      <GestureHandler
        height={height}
        width={width}
        disableGesture={disableGesture}
        center={center}
      >
        <Canvas
          style={{
            height,
            width,
          }}
          onTouch={touchHandler}
          ref={ref}
        >
          <Picture height={height} width={width} image={image} />
          {children}
        </Canvas>
      </GestureHandler>
    );

  return null;
};

export default memo(SkiaRouteCanvas);
