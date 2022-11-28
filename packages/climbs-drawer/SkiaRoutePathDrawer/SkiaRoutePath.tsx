import { Group, Points } from "@shopify/react-native-skia";
import { FC, memo, useCallback, useMemo } from "react";

import usePathToPoints from "../usePathToPoints/usePathToPoints";
import EndPointer from "./EndPointer";
import StartPointer from "./StartPointer";

interface Props {
  path: string;
  label: string;
  color?: string;
  scale?: number;
  strokeWidth?: number;
  routeFromTheGround?: boolean;
}

const SkiaRoutePath: FC<Props> = ({
  label = "?",
  path,
  color = "red",
  scale = 1,
  strokeWidth: strokeWidthProp = 1,
  routeFromTheGround = true,
}) => {
  const { points, start, end } = usePathToPoints(path, scale);

  const strokeWidth = useMemo(
    () => 21.5 * scale * strokeWidthProp,
    [scale, strokeWidthProp],
  );

  const StartComponent = useCallback(
    () =>
      routeFromTheGround ? (
        <StartPointer
          c={start}
          label={label}
          scale={scale * strokeWidthProp}
          color={color}
        />
      ) : (
        <EndPointer c={start} color={color} scale={scale * strokeWidthProp} />
      ),
    [color, label, routeFromTheGround, scale, start, strokeWidthProp],
  );

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
      <EndPointer c={end} color={color} scale={scale * strokeWidthProp} />
      {StartComponent()}
    </Group>
  );
};

export default memo(SkiaRoutePath);
