/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Circle,
  Group,
  SkiaValue,
  SkPoint,
  Text,
  useComputedValue,
  useFont,
} from "@shopify/react-native-skia";
import { FC } from "react";

interface Props {
  label: string;
  c: SkiaValue<SkPoint>;
  color?: string;
  scale?: number;
  backgroundColor?: string;
  simpleStart?: boolean;
}

const StartPointer: FC<Props> = ({
  label,
  c,
  color = "red",
  scale = 1,
  backgroundColor = "white",
  simpleStart,
}) => {
  const fontSize = 120 * scale;
  const r = 100 * scale;
  const strokeWidth = r / 5;
  const font = useFont(require("../assets/fonts/Rubik-SemiBold.ttf"), fontSize);

  const transform = useComputedValue(
    () => [{ translateX: c.current.x }, { translateY: c.current.y }],
    [c],
  );

  const textX = useComputedValue(
    () => (font ? -font.getTextWidth(label) / 2 : 0),
    [font],
  );
  if (simpleStart) {
    return <SimpleStartPointer color={color} c={c} scale={scale} />;
  }
  return (
    <Group transform={transform}>
      <Circle cx={0} cy={0} r={r} color={backgroundColor} />
      <Text y={r / 2} x={textX} text={label} font={font} />
      <Circle
        cx={0}
        cy={0}
        r={r}
        color={color}
        style={"stroke"}
        strokeWidth={strokeWidth}
      />
    </Group>
  );
};

const SimpleStartPointer: FC<Omit<Props, "label">> = ({
  color = "red",
  scale = 1,
  c,
}) => {
  const r = 50 * scale;
  const strokeWidth = r / 5;

  const transform = useComputedValue(
    () => [{ translateX: c.current.x }, { translateY: c.current.y }],
    [c],
  );
  return (
    <Group transform={transform}>
      <Circle cx={0} cy={0} r={r} color={color} strokeWidth={strokeWidth} />
    </Group>
  );
};

export default StartPointer;
