import { ReactNativeZoomableView as ZoomView } from "@openspacelabs/react-native-zoomable-view";
import {
  Canvas,
  SkiaMutableValue,
  useImage,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import { ComponentProps, FC, useCallback } from "react";
import { Dimensions, StyleSheet } from "react-native";

import { Picture } from "../SkiaPicture/SkiaPicture";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

interface Props {
  imageUrl?: string;
  height: number;
  width: number;
  coords?: SkiaMutableValue<{
    x: number;
    y: number;
  }>;
  zoomViewProps?: Partial<ComponentProps<typeof ZoomView>>;
}

const SkiaRouteCanvas: FC<Props> = ({
  imageUrl,
  height,
  width,
  children,
  coords,
  zoomViewProps,
}) => {
  const allowToDraw = useValue(true);

  const touchHandler = useTouchHandler({
    onEnd: ({ x, y }) => {
      if (allowToDraw.current && coords) {
        coords.current = { x, y };
      }
    },
  });

  const image = useImage(imageUrl);

  const blockDrawing = useCallback(() => {
    allowToDraw.current = false;
    return false;
  }, [allowToDraw]);

  const allowDrawingWithTimeout = useCallback(() => {
    setTimeout(() => {
      allowToDraw.current = true;
    }, 300);
  }, [allowToDraw]);

  if (image)
    return (
      <ZoomView
        maxZoom={30}
        contentWidth={width}
        contentHeight={height}
        doubleTapDelay={0}
        minZoom={1}
        style={styles.routeContainer}
        doubleTapZoomToCenter={false}
        onZoomBefore={blockDrawing}
        onZoomEnd={allowDrawingWithTimeout}
        onShiftingBefore={blockDrawing}
        onShiftingEnd={allowDrawingWithTimeout}
        {...zoomViewProps}
      >
        <Canvas
          style={{
            height,
            width,
          }}
          onTouch={touchHandler}
          mode="continuous"
        >
          <Picture height={height} width={width} image={image} />
          {children}
        </Canvas>
      </ZoomView>
    );

  return null;
};

export default SkiaRouteCanvas;

const styles = StyleSheet.create({
  routeContainer: { zIndex: 1000 },
});
