import { BoxProps, TextProps } from '@shopify/restyle';
import { BaseTheme, Theme } from '@andescalada/ui/Theme/theme';

export const createBoxVariant = <
  T extends { [name: string]: BoxProps<BaseTheme> },
>(
  variantObject: T,
) => variantObject;

export const createTextVariant = <
  T extends { [name: string]: TextProps<Theme> },
>(
  variantObject: T,
) => variantObject;
