import { Group, Points } from "@shopify/react-native-skia";
import { FC, useMemo } from "react";

import usePathToPoints from "../usePathToPoints/usePathToPoints";
import EndPointer from "./EndPointer";
import StartPointer from "./StartPointer";

interface Props {
  path: string;
  label: string;
  color?: string;
  scale?: number;
}

const SkiaRoutePath: FC<Props> = ({
  label = "?",
  path,
  color = "red",
  scale = 1,
}) => {
  const { points, start, end } = usePathToPoints(path, scale);

  const strokeWidth = useMemo(() => 21.5 * scale, [scale]);

  return (
    <Group>
      <Points
        points={points}
        mode="polygon"
        color={color}
        style="stroke"
        strokeJoin="round"
        strokeCap="round"
        strokeMiter={1}
        strokeWidth={strokeWidth}
      />
      <EndPointer c={end} color={color} scale={scale} />
      <StartPointer c={start} label={label} scale={scale} />
    </Group>
  );
};

export default SkiaRoutePath;
