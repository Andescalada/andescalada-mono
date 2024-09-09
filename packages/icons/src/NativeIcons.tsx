import { FC, useMemo } from "react";

import { Icons } from "./map";

export type IconNames = keyof typeof Icons;

export interface Props {
  name: IconNames;
  size?: number;
  color?: string;
  style?: [{ color: string }];
}

export const Icon: FC<Props> = ({ name, size = 28, color, style }) => {
  const fill = useMemo(() => (style ? style[0].color : color), [color, style]);

  return Icons[name]({
    height: size,
    width: size,
    fill,
  });
};
