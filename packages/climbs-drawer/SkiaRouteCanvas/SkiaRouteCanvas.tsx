import {
  Canvas,
  Circle,
  Group,
  SkiaMutableValue,
  useMultiTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import { FC } from "react";
import { Dimensions } from "react-native";

import { GestureHandler } from "../GestureHandler/GestureHandler";
import { Picture } from "../SkiaPicture/SkiaPicture";
import useCacheImage from "../useCacheImage/useCacheImage";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const DEBUG = __DEV__ && true;
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
  const pointerX = useValue(0);
  const pointerY = useValue(0);
  const pointer2X = useValue(0);
  const pointer2Y = useValue(0);

  const touchHandler = useMultiTouchHandler({
    onEnd: ({ x, y, id }) => {
      if (coords) {
        const isXOutOfBound = Math.abs(x) > width;
        const isYOutOfBound = Math.abs(y) > height;

        if (id === 0 && DEBUG) {
          pointerX.current = x;
          pointerY.current = y;
        }
        if (id === 1 && DEBUG) {
          pointer2X.current = x;
          pointer2Y.current = y;
        }
        if (isXOutOfBound || isYOutOfBound || id > 0) {
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
          {DEBUG && (
            <Group>
              <Circle r={5} cx={pointerX} cy={pointerY} color={"red"} />
              <Circle r={5} cx={pointer2X} cy={pointer2Y} color={"blue"} />
            </Group>
          )}
          {children}
        </Canvas>
      </GestureHandler>
    );

  return null;
};

export default SkiaRouteCanvas;
