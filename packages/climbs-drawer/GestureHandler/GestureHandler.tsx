import type { SkRect } from "@shopify/react-native-skia";
import React, { ReactNode, useMemo } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Matrix4, multiply4 } from "react-native-redash";

import { concat, initial4, vec3 } from "./MatrixHelpers";

interface GestureHandlerProps {
  dimensions?: SkRect;
  children: ReactNode;
  height: number;
  width: number;
  center?: boolean;
  disableGesture?: boolean;
}

export const GestureHandler = ({
  children,
  height,
  width,
  center = true,
  disableGesture = false,
}: GestureHandlerProps) => {
  const x = 0;
  const y = 0;
  const { initialValue, scale: initialScale } = initial4({
    height,
    width,
    skipTransformation: !center,
  });

  const origin = useSharedValue(vec3(0, 0, 0));
  const matrix = useSharedValue(initialValue);
  const offset = useSharedValue(initialValue);

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!disableGesture)
        .onChange((e) => {
          if (e.numberOfPointers > 1) return;
          matrix.value = multiply4(
            Matrix4.translate(e.changeX, e.changeY, 0),
            matrix.value,
          );
        })
        .onEnd(() => {
          const currentScale = matrix.value[0];
          if (currentScale <= initialScale) {
            matrix.value = initialValue;
          }
        }),
    [initialValue, matrix, disableGesture, initialScale],
  );

  const scale = useMemo(
    () =>
      Gesture.Pinch()
        .enabled(!disableGesture)
        .onStart((e) => {
          origin.value = [e.focalX, e.focalY, 0];
          offset.value = matrix.value;
        })
        .onChange((e) => {
          matrix.value = concat(offset.value, origin.value, [
            { scale: e.scale },
          ]);
        })
        .onEnd(() => {
          const currentScale = matrix.value[0];
          if (currentScale < initialScale) {
            matrix.value = concat(initialValue, [0, 0, 0], [{ scale: 1 }]);
          }
        }),
    [initialValue, matrix, offset, origin, disableGesture, initialScale],
  );

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    left: x,
    top: y,
    width,
    height,
    transform: [
      { translateX: -width / 2 },
      { translateY: -height / 2 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { matrix: matrix.value as any },
      { translateX: width / 2 },
      { translateY: height / 2 },
    ],
  }));

  return (
    <GestureDetector gesture={Gesture.Simultaneous(scale, pan)}>
      <Animated.View style={style}>{children}</Animated.View>
    </GestureDetector>
  );
};
