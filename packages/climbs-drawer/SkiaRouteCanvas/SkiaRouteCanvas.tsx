import { ReactNativeZoomableView as ZoomView } from "@openspacelabs/react-native-zoomable-view";
import {
  Canvas,
  SkiaMutableValue,
  useImage,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import { FC, useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { Picture } from "../SkiaPicture/SkiaPicture";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

interface Props {
  imageUrl: string;
  height: number;
  width: number;
  coords: SkiaMutableValue<{
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
  const allowToDraw = useValue(true);

  const touchHandler = useTouchHandler({
    onEnd: ({ x, y }) => {
      if (allowToDraw.current) {
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
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ position: "absolute", width: 10, height: 10 }} />
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
      </View>
    );

  return null;
};

export default SkiaRouteCanvas;

const styles = StyleSheet.create({
  routeContainer: { zIndex: 1000 },
});
