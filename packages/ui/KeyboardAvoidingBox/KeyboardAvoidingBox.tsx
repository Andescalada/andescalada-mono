import { createBox } from "@shopify/restyle";
import { ComponentProps } from "react";
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from "react-native";

import { Theme } from "../Theme/theme";

const KeyboardAvoidingBox = createBox<
  Theme,
  ComponentProps<typeof RNKeyboardAvoidingView>
>(RNKeyboardAvoidingView);

export default KeyboardAvoidingBox;
