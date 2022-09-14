import { BoxProps, TextProps } from '@shopify/restyle';
import { baseTheme, Theme } from '@andescalada/ui/Theme/theme';

export const createBoxVariant = <
  T extends { [name: string]: BoxProps<baseTheme> },
>(
  variantObject: T,
) => variantObject;

export const createTextVariant = <
  T extends { [name: string]: TextProps<Theme> },
>(
  variantObject: T,
) => variantObject;
