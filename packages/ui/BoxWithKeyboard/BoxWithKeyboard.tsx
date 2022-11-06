import { BoxProps, createBox } from "@shopify/restyle";
import { ComponentProps, FC, useMemo } from "react";
import { Keyboard, Platform } from "react-native";

import KeyBoardAvoidingBox from "../KeyboardAvoidingBox/KeyboardAvoidingBox";
import Pressable from "../Pressable/Pressable";

interface Props extends ComponentProps<typeof KeyBoardAvoidingBox> {
  pressableProps?: ComponentProps<typeof Pressable>;
  keyboardOffset?: ComponentProps<
    typeof KeyBoardAvoidingBox
  >["keyboardVerticalOffset"];
  disableAvoiding?: boolean;
}

const BoxWithKeyboard: FC<Props> = ({
  children,
  pressableProps,
  keyboardOffset,
  disableAvoiding = false,
  ...props
}) => {
  const behavior = useMemo(() => {
    if (disableAvoiding) return undefined;
    return Platform.OS === "ios" ? "position" : undefined;
  }, [disableAvoiding]);

  return (
    <Pressable onPress={Keyboard.dismiss} flex={1} {...pressableProps}>
      <KeyBoardAvoidingBox
        behavior={behavior}
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
