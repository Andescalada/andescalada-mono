import { Icon as AndescaladaIcon } from "@andescalada/icons";
import { useTheme } from "@shopify/restyle";
import { ComponentProps, FC, useMemo } from "react";

import { Theme } from "../Theme/theme";

interface Props extends Omit<ComponentProps<typeof AndescaladaIcon>, "color"> {
  color?: keyof Theme["colors"];
}

const Icon: FC<Props> = (props) => {
  const theme = useTheme<Theme>();

  const themeColor = useMemo(
    () => theme.colors[props.color || "grayscale.white"],
    [props.color, theme.colors],
  );

  return <AndescaladaIcon {...props} color={themeColor} />;
};

export default Icon;
