import ExpoIonicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@shopify/restyle";
import { ComponentProps, FC } from "react";

import { Colors, Theme } from "../Theme/Theme";

export type IoniconsNames = ComponentProps<typeof ExpoIonicons>["name"];

interface Props extends Omit<ComponentProps<typeof ExpoIonicons>, "color"> {
  color?: Colors;
}

const Ionicons: FC<Props> = ({ color = "text", ...props }) => {
  const theme = useTheme<Theme>();
  return <ExpoIonicons color={theme.colors[color]} {...props} />;
};

export default Ionicons;
