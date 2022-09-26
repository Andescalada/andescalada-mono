import type {
  SkiaMutableValue,
  SkMatrix,
  SkRect,
} from "@shopify/react-native-skia";
import { Skia, useSharedValueEffect } from "@shopify/react-native-skia";
import React, { ReactNode } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { identity4, Matrix4, multiply4, toMatrix3 } from "react-native-redash";

import { concat, vec3 } from "./MatrixHelpers";

interface GestureHandlerProps {
  matrix: SkiaMutableValue<SkMatrix>;
  dimensions: SkRect;
  debug?: boolean;
  children: ReactNode;
}

export const GestureHandler = ({
  matrix: skMatrix,
  dimensions,
  debug,
  children,
}: GestureHandlerProps) => {
  const { x, y, width, height } = dimensions;
  const origin = useSharedValue(vec3(0, 0, 0));
  const matrix = useSharedValue(identity4);
  const offset = useSharedValue(identity4);

  useSharedValueEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skMatrix.current = Skia.Matrix(toMatrix3(matrix.value) as any);
  }, matrix);

  const pan = Gesture.Pan().onChange((e) => {
    matrix.value = multiply4(
      Matrix4.translate(e.changeX, e.changeY, 0),
      matrix.value,
    );
  });

  const scale = Gesture.Pinch()
    .onBegin((e) => {
      origin.value = [e.focalX, e.focalY, 0];
      offset.value = matrix.value;
    })
    .onChange((e) => {
      matrix.value = concat(offset.value, origin.value, [{ scale: e.scale }]);
    });

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    left: x,
    top: y,
    width,
    height,
    backgroundColor: debug ? "rgba(100, 200, 300, 0.4)" : "transparent",
    transform: [
      // { translateX: -width / 2 },
      // { translateY: -height / 2 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { matrix: matrix.value as any },
      // { translateX: width / 2 },
      // { translateY: height / 2 },
    ],
  }));
  return (
    <GestureDetector gesture={Gesture.Race(pan, scale)}>
      <Animated.View style={style}>{children}</Animated.View>
    </GestureDetector>
  );
};
