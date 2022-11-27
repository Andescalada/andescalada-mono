import { ComponentProps, FC } from "react";
import { Keyboard } from "react-native";

import Pressable from "../Pressable/Pressable";

type Props = ComponentProps<typeof Pressable>;

const BoxWithKeyboard: FC<Props> = ({ children, ...props }) => {
  return (
    <Pressable onPress={Keyboard.dismiss} flex={1} {...props}>
      {children}
    </Pressable>
  );
};

export default BoxWithKeyboard;
