import { createBox } from "@shopify/restyle";
import { ComponentProps } from "react";
import Animated from "react-native-reanimated";

import { Theme } from "../Theme/theme";

const Image = createBox<Theme, ComponentProps<typeof Animated.Image>>(
  Animated.Image,
);

export default Image;
