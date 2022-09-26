import { Group, Points } from "@shopify/react-native-skia";
import { FC } from "react";

import usePathToPoints from "../usePathToPoints/usePathToPoints";
import EndPointer from "./EndPointer";
import StartPointer from "./StartPointer";

interface Props {
  path: string;
  label: string;
  color?: string;
}

const SkiaRoutePath: FC<Props> = ({ label = "?", path, color = "red" }) => {
  const { points, start, end } = usePathToPoints(path);

  return (
    <Group>
      <Points
        points={points}
        mode="polygon"
        color={color}
        style="stroke"
        strokeJoin={"round"}
        strokeCap="round"
        strokeMiter={1}
        strokeWidth={2}
      />
      <EndPointer c={end} color={color} />
      <StartPointer c={start} label={label} />
    </Group>
  );
};

export default SkiaRoutePath;
