import {
  Icon as AndescaladaIcon,
  IconNames,
  Props as IconProps,
} from "@andescalada/icons/NativeIcons";
import { useTheme } from "@shopify/restyle";
import { FC, useMemo } from "react";

import { Theme } from "../Theme/config";

interface Props extends Omit<IconProps, "color" | "name"> {
  color?: keyof Theme["colors"];
  name?: IconNames;
}

const Icon: FC<Props> = ({ name = "question-mark", ...props }) => {
  const theme = useTheme<Theme>();

  const themeColor = useMemo(
    () => theme.colors[props.color || "grayscale.white"],
    [props.color, theme.colors],
  );

  return <AndescaladaIcon name={name} {...props} color={themeColor} />;
};

export default Icon;
