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
}

const StartPointer: FC<Props> = ({ label, c, color = "red", scale = 1 }) => {
  const fontSize = 120 * scale;
  const r = 100 * scale;
  const strokeWidth = r / 5;
  const font = useFont(require("../assets/fonts/Rubik-SemiBold.ttf"), fontSize);

  const transform = useComputedValue(
    () => [{ translateX: c.current.x }, { translateY: c.current.y }],
    [c],
  );
  if (font === null) {
    return null;
  }
  const textWidth = font.getTextWidth(label);
  return (
    <Group transform={transform}>
      <Circle cx={0} cy={0} r={r} color="white" />
      <Text y={r / 2} x={-textWidth / 2} text={label} font={font} />
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

export default StartPointer;
