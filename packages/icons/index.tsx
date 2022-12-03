import { FC, useMemo } from "react";

import { Icons } from "./map";

const IconName =Object.keys(Icons).filter(k => k.search("color")=== -1) as (keyof typeof Icons)[];

export type IconNames = keyof typeof Icons;

interface Props {
  name: IconNames;
  size?: number;
  color?: string;
  style?: [{ color: string }];
}

export const Icon: FC<Props> = ({ name, size = 28, color, style }) => {
  const fill = useMemo(() => (style ? style[0].color : color), [color, style]);

  return Icons[name] === undefined
    ? Icons["help"]({
        height: size,
        width: size,
        fill,
      })
    : Icons[name]({
        height: size,
        width: size,
        fill,
      });
};
