import { SkRect } from "@shopify/react-native-skia";
import React, { ReactNode } from "react";
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
}

export const GestureHandler = ({
  children,
  height,
  width,
}: GestureHandlerProps) => {
  const x = 0;
  const y = 0;
  const initialValue = initial4({ height, width });

  const origin = useSharedValue(vec3(0, 0, 0));
  const matrix = useSharedValue(initialValue);
  const offset = useSharedValue(initialValue);

  const pan = Gesture.Pan()
    .onChange((e) => {
      matrix.value = multiply4(
        Matrix4.translate(e.changeX, e.changeY, 0),
        matrix.value,
      );
    })
    .onEnd(() => {
      const currentScale = matrix.value[0];
      if (currentScale <= 1) {
        matrix.value = initialValue;
      }
    });

  const scale = Gesture.Pinch()
    .onBegin((e) => {
      origin.value = [e.focalX, e.focalY, 0];
      offset.value = matrix.value;
    })
    .onChange((e) => {
      matrix.value = concat(offset.value, origin.value, [{ scale: e.scale }]);
    })
    .onEnd(() => {
      const currentScale = matrix.value[0];
      if (currentScale < 1) {
        matrix.value = concat(initialValue, [0, 0, 0], [{ scale: 1 }]);
      }
    });

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
    <GestureDetector gesture={Gesture.Race(pan, scale)}>
      <Animated.View style={style}>{children}</Animated.View>
    </GestureDetector>
  );
};
