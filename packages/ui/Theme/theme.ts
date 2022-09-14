import { createTheme } from '@shopify/restyle';
import breakpoints from './breakpoints';
import { pallete } from './pallete';
import spacing from './spacing';
import textVariants from './textVariants';
import textInputVariants from './textInputVariants';

const variants = { textVariants, textInputVariants };

const darkBaseTheme = {
  colors: {
    primary: pallete.brand.primaryB,
    text: pallete.grayscale[100],
    textContrast: pallete.grayscale.black,
    listItemBackground: pallete.grayscale[600],
    filledTextInputVariantBackground: pallete.grayscale[300],
    filledTextInputVariantPlaceholder: pallete.grayscale.black,
    primaryButtonBackground: pallete.shadesB[100],
    primaryButtonText: pallete.shadesB[400],
    ...pallete.semantic,
  },
  breakpoints,
  spacing,
};

const theme = createTheme({ ...darkBaseTheme, ...variants });

export type Theme = typeof theme;
export type baseTheme = typeof darkBaseTheme;
export type Colors = Partial<keyof Omit<Theme['colors'], 'defaults'>>;
export default theme;
