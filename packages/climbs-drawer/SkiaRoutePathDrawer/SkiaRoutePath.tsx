import {
  Group,
  Points,
  SkiaMutableValue,
  SkPoint,
  useValue,
} from "@shopify/react-native-skia";
import { FC, memo, useMemo } from "react";

import usePathToPoints from "../usePathToPoints/usePathToPoints";
import { pointToVector } from "../utils";
import EndPointer from "./EndPointer";
import StartPointer from "./StartPointer";

interface Props {
  path: string;
  pitchLabelPoint?: string | undefined;
  pitchLabelTitle?: string | undefined;
  label: string;
  color?: string;
  scale?: number;
  strokeWidth?: number;
  routeFromTheGround?: boolean;
}

const SkiaRoutePath: FC<Props> = ({
  label = "?",
  path,
  pitchLabelPoint: pitchLabelPointProp,
  pitchLabelTitle,
  color = "red",
  scale = 1,
  strokeWidth: strokeWidthProp = 1,
  routeFromTheGround = true,
}) => {
  const { points, start, end } = usePathToPoints(path, scale);
  const pitchLabelPoint = useValue<SkPoint>(
    pointToVector(pitchLabelPointProp, scale),
  );

  const strokeWidth = useMemo(
    () => 21.5 * scale * strokeWidthProp,
    [scale, strokeWidthProp],
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
      {pitchLabelPointProp && pitchLabelTitle && (
        <StartPointer
          color="transparent"
          backgroundColor={color}
          label={pitchLabelTitle}
          scale={scale * strokeWidthProp}
          c={pitchLabelPoint}
        />
      )}
      <EndPointer c={end} color={color} scale={scale * strokeWidthProp} />
      {
        <StartComponent
          color={color}
          label={label}
          routeFromTheGround={routeFromTheGround}
          scale={scale}
          start={start}
          strokeWidthProp={strokeWidthProp}
        />
      }
    </Group>
  );
};

export default memo(SkiaRoutePath);

interface StartComponentProps {
  color: string;
  label: string;
  routeFromTheGround: boolean;
  scale: number;
  start: SkiaMutableValue<SkPoint>;
  strokeWidthProp: number;
}

const StartComponent = ({
  color,
  label,
  routeFromTheGround,
  scale,
  start,
  strokeWidthProp,
}: StartComponentProps) =>
  routeFromTheGround ? (
    <StartPointer
      c={start}
      label={label}
      scale={scale * strokeWidthProp}
      color={color}
    />
  ) : (
    <EndPointer c={start} color={color} scale={scale * strokeWidthProp} />
  );
