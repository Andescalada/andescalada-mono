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
}

const StartPointer: FC<Props> = ({ label, c, color = "red" }) => {
  const fontSize = 12;
  const font = useFont(require("../assets/fonts/Rubik-SemiBold.ttf"), fontSize);

  const transform = useComputedValue(
    () => [{ translateX: c.current.x }, { translateY: c.current.y }],
    [c],
  );
  if (font === null) {
    return null;
  }
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
      <Text x={-4} y={+5} text={label} font={font} />
    </Group>
  );
};

export default StartPointer;
