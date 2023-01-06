import { BaseTheme } from "@andescalada/ui/Theme/theme";
import { BoxProps, TextProps } from "@shopify/restyle";

export const createBoxVariant = <
  T extends { [name: string]: BoxProps<BaseTheme> },
>(
  variantObject: T,
) => variantObject;

export const createTextVariant = <
  T extends { [name: string]: TextProps<BaseTheme> },
>(
  variantObject: T,
) => variantObject;
