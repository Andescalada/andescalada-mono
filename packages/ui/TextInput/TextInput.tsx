import Box from "@andescalada/ui/Box/Box";
import { Theme } from "@andescalada/ui/Theme/theme";
import {
  createRestyleComponent,
  createText,
  createVariant,
  useTheme,
  VariantProps,
} from "@shopify/restyle";
import { ComponentProps, FC, useMemo } from "react";
import { TextInput as RNTextInput, TextInputProps } from "react-native";

const OriginalTextInput = createText<Theme, TextInputProps>(RNTextInput);

const TextFieldContainer = createRestyleComponent<
  VariantProps<Theme, "textInputVariants"> & ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: "textInputVariants" })], Box);

interface Props
  extends Omit<ComponentProps<typeof OriginalTextInput>, "variant"> {
  variant?: ComponentProps<typeof TextFieldContainer>["variant"];
  containerProps?: Partial<ComponentProps<typeof TextFieldContainer>>;
  textVariant?: ComponentProps<typeof OriginalTextInput>["variant"];
}

const TextInput: FC<Props> = ({
  containerProps,
  variant = "filled",
  textVariant,
  ...props
}) => {
  const color = useMemo(() => {
    if (variant === "disableAsText") return "text";
    return "textContrast";
  }, [variant]);

  const theme = useTheme<Theme>();
  return (
    <TextFieldContainer variant={variant} {...containerProps}>
      <OriginalTextInput
        variant={textVariant}
        color={color}
        style={{ flex: 1 }}
        placeholderTextColor={theme.colors.filledTextInputVariantPlaceholder}
        {...props}
      />
    </TextFieldContainer>
  );
};

export default TextInput;
