/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Circle,
  FitBox,
  Group,
  Path,
  rect,
  SkPoint,
} from "@shopify/react-native-skia";
import { FC } from "react";

interface Props {
  c: SkPoint;
}

const EndPointer: FC<Props> = ({ c }) => {
  return (
    <Group>
      <Circle c={c} r={10} color="white" />
      <Circle c={c} r={10} color="red" style={"stroke"} strokeWidth={2} />
      <FitBox src={rect(0, 0, 100, 100)} dst={rect(c.x - 7.5, c.y - 7.5, 3, 3)}>
        <Path
          path="M112 268l144 144 144-144M256 392V100"
          strokeWidth={48}
          color="red"
          style={"stroke"}
        />
      </FitBox>
    </Group>
  );
};

export default EndPointer;
