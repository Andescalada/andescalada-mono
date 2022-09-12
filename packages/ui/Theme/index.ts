import { createTheme } from '@shopify/restyle';
import breakpoints from './breakpoints';
import spacing from './spacing';
import textVariants from './textVariants';

const baseTheme = {
  colors: {
    primary: '#0000',
  },
  breakpoints,
  spacing,
};

const variants = { textVariants };

const theme = createTheme({ ...baseTheme, ...variants });

export type Theme = typeof theme;
export default theme;
