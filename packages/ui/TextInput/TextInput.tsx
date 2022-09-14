import {
  createRestyleComponent,
  createText,
  createVariant,
  useTheme,
  VariantProps,
} from '@shopify/restyle';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';
import { Theme } from '@andescalada/ui/Theme/theme';
import { ComponentProps, useMemo, FC } from 'react';
import Box from '@andescalada/ui/Box/Box';

const OriginalTextInput = createText<Theme, TextInputProps>(RNTextInput);

const TextFieldContainer = createRestyleComponent<
  VariantProps<Theme, 'textInputVariants'> & ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: 'textInputVariants' })], Box);

interface Props
  extends Omit<ComponentProps<typeof OriginalTextInput>, 'variant'> {
  variant?: ComponentProps<typeof TextFieldContainer>['variant'];
  containerProps?: Partial<ComponentProps<typeof TextFieldContainer>>;
}

const TextInput: FC<Props> = ({
  containerProps,
  variant = 'filled',
  ...props
}) => {
  // const color = useMemo(
  //   () => (props.editable === false ? 'textFieldNotEditable' : 'textField'),
  //   [props.editable],
  // );

  const theme = useTheme<Theme>();
  return (
    <TextFieldContainer variant={variant} {...containerProps}>
      <OriginalTextInput
        color="textContrast"
        fontFamily="Rubik-400"
        placeholderTextColor={theme.colors.filledTextInputVariantPlaceholder}
        {...props}
      />
    </TextFieldContainer>
  );
};

export default TextInput;
