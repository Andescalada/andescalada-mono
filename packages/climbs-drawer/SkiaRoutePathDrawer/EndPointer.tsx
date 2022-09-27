import {
  Circle,
  FitBox,
  Group,
  Path,
  rect,
  SkiaValue,
  SkPoint,
  useComputedValue,
} from "@shopify/react-native-skia";
import { FC } from "react";

interface Props {
  c: SkiaValue<SkPoint>;
  color?: string;
  scale?: number;
}

const EndPointer: FC<Props> = ({ c, color = "red", scale = 1 }) => {
  const r = 100 * scale;
  const strokeWidth = r / 5;
  const arrowSize = r / 3;
  const transform = useComputedValue(
    () => [{ translateX: c.current.x }, { translateY: c.current.y }],
    [c],
  );

  return (
    <Group transform={transform}>
      <Circle cx={0} cy={0} r={r} color="white" />
      <Circle
        cx={0}
        cy={0}
        r={r}
        color={color}
        style={"stroke"}
        strokeWidth={strokeWidth}
      />

      <FitBox
        fit="contain"
        src={rect(0, 0, 100, 100)}
        dst={rect(0, 0, arrowSize, arrowSize)}
      >
        <Path
          path="M -144 0 L 0 144 L 144 0 m -144 144 v -312"
          strokeWidth={48}
          color={color}
          strokeJoin="miter"
          style={"stroke"}
        />
      </FitBox>
    </Group>
  );
};

export default EndPointer;
