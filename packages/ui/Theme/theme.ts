import { createTheme } from '@shopify/restyle';
import breakpoints from './breakpoints';
import { pallete } from './pallete';
import spacing from './spacing';
import textVariants from './textVariants';

const variants = { textVariants };

const darkBaseTheme = {
  colors: {
    primary: pallete.brand.primaryB,
    text: pallete.grayscale[100],
    listItemBackground: pallete.grayscale[600],
  },
  breakpoints,
  spacing,
};

const theme = createTheme({ ...darkBaseTheme, ...variants });

export type Theme = typeof theme;
export type Colors = Partial<keyof Omit<Theme['colors'], 'defaults'>>;
export default theme;
