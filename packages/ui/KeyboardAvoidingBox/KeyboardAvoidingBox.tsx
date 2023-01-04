import { createBox } from "@shopify/restyle";
import { ComponentProps } from "react";
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from "react-native";

import { Theme } from "../Theme/theme";

const Component = createBox<
  Theme,
  ComponentProps<typeof RNKeyboardAvoidingView>
>(RNKeyboardAvoidingView);

type Props = ComponentProps<typeof Component>;
const KeyboardAvoidingBox = (props: Props) => (
  <Component
    flex={1}
    behavior="position"
    contentContainerStyle={[{ flex: 1 }, props.contentContainerStyle]}
    {...props}
  />
);

export default KeyboardAvoidingBox;
