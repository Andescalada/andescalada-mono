import { createTheme } from '@shopify/restyle';
import breakpoints from './breakpoints';
import { pallete } from './pallete';
import spacing from './spacing';
import textVariants from './textVariants';

const variants = { textVariants };

const darkBaseTheme = {
  colors: {
    primary: '#0000',
    text: pallete.grayscale[100],
  },
  breakpoints,
  spacing,
};

const theme = createTheme({ ...darkBaseTheme, ...variants });

export type Theme = typeof theme;
export default theme;
