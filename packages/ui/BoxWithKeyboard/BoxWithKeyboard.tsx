import { BoxProps, createBox } from "@shopify/restyle";
import { ComponentProps, FC } from "react";
import { Keyboard, Platform } from "react-native";

import KeyBoardAvoidingBox from "../KeyboardAvoidingBox/KeyboardAvoidingBox";
import Pressable from "../Pressable/Pressable";

interface Props extends ComponentProps<typeof KeyBoardAvoidingBox> {
  pressableProps?: ComponentProps<typeof Pressable>;
  keyboardOffset?: ComponentProps<
    typeof KeyBoardAvoidingBox
  >["keyboardVerticalOffset"];
}

const BoxWithKeyboard: FC<Props> = ({
  children,
  pressableProps,
  keyboardOffset,
  ...props
}) => {
  return (
    <Pressable onPress={Keyboard.dismiss} flex={1} {...pressableProps}>
      <KeyBoardAvoidingBox
        behavior={Platform.OS === "ios" ? "position" : undefined}
        flex={1}
        keyboardVerticalOffset={keyboardOffset}
        {...props}
      >
        {children}
      </KeyBoardAvoidingBox>
    </Pressable>
  );
};

export default BoxWithKeyboard;
