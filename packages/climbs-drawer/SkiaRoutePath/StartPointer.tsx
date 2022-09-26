/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Circle,
  Fill,
  Group,
  SkPoint,
  Text,
  useFont,
} from "@shopify/react-native-skia";
import { FC } from "react";

interface Props {
  label: string;
  c: SkPoint;
}

const StartPointer: FC<Props> = ({ label, c }) => {
  const fontSize = 12;
  const font = useFont(require("../assets/fonts/Rubik-SemiBold.ttf"), fontSize);
  if (font === null) {
    return null;
  }
  return (
    <Group>
      <Circle c={c} r={10} color="white" />
      <Circle c={c} r={10} color="red" style={"stroke"} strokeWidth={2} />
      <Text x={c.x - 3} y={c.y + 5} text={label} font={font} />
    </Group>
  );
};

export default StartPointer;
