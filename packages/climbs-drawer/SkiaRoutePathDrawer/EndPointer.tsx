/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Circle,
  FitBox,
  Group,
  Path,
  rect,
  SkiaValue,
  SkPoint,
  useComputedValue,
  useValue,
  useValueEffect,
} from "@shopify/react-native-skia";
import { FC } from "react";

interface Props {
  c: SkiaValue<SkPoint>;
  color?: string;
}

const EndPointer: FC<Props> = ({ c, color = "red" }) => {
  const transform = useComputedValue(
    () => [{ translateX: c.current.x }, { translateY: c.current.y }],
    [c],
  );
  return (
    <Group transform={transform}>
      <Circle cx={0} cy={0} r={10} color="white" />
      <Circle
        cx={0}
        cy={0}
        r={10}
        color={color}
        style={"stroke"}
        strokeWidth={2}
      />

      <FitBox fit="contain" src={rect(0, 0, 100, 100)} dst={rect(-8, -8, 3, 3)}>
        <Path
          path="M112 268l144 144 144-144M256 392V100"
          strokeWidth={48}
          color={color}
          style={"stroke"}
        />
      </FitBox>
    </Group>
  );
};

export default EndPointer;
