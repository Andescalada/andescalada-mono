import { Theme } from "@andescalada/ui/Theme/theme";
import { createBox } from "@shopify/restyle";
import { ComponentProps } from "react";
import { Pressable as ReactPressable } from "react-native";

const Pressable = createBox<Theme, ComponentProps<typeof ReactPressable>>(
  ReactPressable,
);

export default Pressable;
