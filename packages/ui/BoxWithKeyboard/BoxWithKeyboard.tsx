import { ComponentProps, FC, useMemo } from "react";
import { Keyboard, Platform } from "react-native";

import KeyBoardAvoidingBox from "../KeyboardAvoidingBox/KeyboardAvoidingBox";
import Pressable from "../Pressable/Pressable";

interface Props extends ComponentProps<typeof Pressable> {
  keyboardAvoidingProps?: ComponentProps<typeof KeyBoardAvoidingBox>;
  keyboardOffset?: ComponentProps<
    typeof KeyBoardAvoidingBox
  >["keyboardVerticalOffset"];
  disableAvoiding?: boolean;
}

const BoxWithKeyboard: FC<Props> = ({
  children,
  keyboardAvoidingProps,
  keyboardOffset,
  disableAvoiding = false,
  ...props
}) => {
  const behavior = useMemo(() => {
    if (disableAvoiding) return undefined;
    return Platform.OS === "ios" ? "position" : undefined;
  }, [disableAvoiding]);

  return (
    <KeyBoardAvoidingBox
      behavior={behavior}
      enabled
      contentContainerStyle={{
        flex: 1,
      }}
      flex={1}
      keyboardVerticalOffset={keyboardOffset}
      {...keyboardAvoidingProps}
    >
      <Pressable onPress={Keyboard.dismiss} flex={1} {...props}>
        {children}
      </Pressable>
    </KeyBoardAvoidingBox>
  );
};

export default BoxWithKeyboard;
