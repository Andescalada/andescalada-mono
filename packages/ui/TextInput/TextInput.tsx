import Box from "@andescalada/ui/Box/Box";
import { Theme } from "@andescalada/ui/Theme/theme";
import {
  createRestyleComponent,
  createText,
  createVariant,
  useTheme,
  VariantProps,
} from "@shopify/restyle";
import {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  useMemo,
} from "react";
import { TextInput as RNTextInput, TextInputProps } from "react-native";

import InputAdornment from "../InputAdornment/InputAdornment";

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
  adornmentProps?: Partial<ComponentProps<typeof InputAdornment>>;
}

export type TextInputRef = RNTextInput;

const TextInput: ForwardRefRenderFunction<TextInputRef, Props> = (
  {
    containerProps,
    variant = "filled",
    textVariant = "textInput",
    adornmentProps,
    ...props
  },
  ref,
) => {
  const color = useMemo(() => {
    if (variant === "disableAsText") return "text";
    return "textContrast";
  }, [variant]);

  const theme = useTheme<Theme>();
  return (
    <TextFieldContainer variant={variant} {...containerProps}>
      <InputAdornment {...adornmentProps}>
        <OriginalTextInput
          ref={ref}
          variant={textVariant}
          color={color}
          style={{ flex: 1 }}
          placeholderTextColor={theme.colors.filledTextInputVariantPlaceholder}
          {...props}
        />
      </InputAdornment>
    </TextFieldContainer>
  );
};

export default forwardRef(TextInput);
