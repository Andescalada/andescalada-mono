import { Icon as AndescaladaIcon, IconNames } from "@andescalada/icons";
import { useTheme } from "@shopify/restyle";
import { ComponentProps, FC, useMemo } from "react";

import { Theme } from "../Theme/theme";

interface Props
  extends Omit<ComponentProps<typeof AndescaladaIcon>, "color" | "name"> {
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
