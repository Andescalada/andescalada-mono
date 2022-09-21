import {
  composeRestyleFunctions,
  spacing,
  SpacingProps,
  useRestyle,
  useTheme,
} from "@shopify/restyle";
import { ComponentProps, FC } from "react";
import { ActivityIndicator as RNActivityIndicator } from "react-native";

import { Colors, Theme } from "../Theme/theme";

interface Props
  extends SpacingProps<Theme>,
    Omit<ComponentProps<typeof RNActivityIndicator>, "color"> {
  color?: Colors;
}

const restyleFunctions = composeRestyleFunctions<Theme, Omit<Props, "color">>([
  spacing,
]);

const ActivityIndicator: FC<Props> = ({ color = "primary", ...rest }) => {
  const props = useRestyle(restyleFunctions, rest);

  const { colors } = useTheme<Theme>();
  const themeColor = colors[color];

  return <RNActivityIndicator color={themeColor} {...props} />;
};

export default ActivityIndicator;
