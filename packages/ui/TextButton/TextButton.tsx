import { ComponentProps, FC, ReactNode, useMemo } from "react";

import ActivityIndicator from "../ActivityIndicator/ActivityIndicator";
import Pressable from "../Pressable/Pressable";
import Text from "../Text/Text";
import { Colors } from "../Theme/theme";

interface Props extends ComponentProps<typeof Pressable> {
  variant: "info" | "error";
  textProps?: Omit<ComponentProps<typeof Text>, "variant">;
  children?: ReactNode;
  textVariant?: ComponentProps<typeof Text>["variant"];
  isLoading?: boolean;
}

const TextButton: FC<Props> = ({
  children,
  textVariant = "p2R",
  textProps,
  variant,
  isLoading,
  ...props
}) => {
  const color = useMemo(
    () =>
      `textButton${
        variant.charAt(0).toUpperCase() + variant.slice(1)
      }` as Colors,
    [variant],
  );
  return (
    <Pressable {...props}>
      {isLoading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Text
          variant={textVariant}
          color={color}
          textDecorationLine="underline"
          {...textProps}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default TextButton;
