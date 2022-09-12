import { createTheme } from '@shopify/restyle';
import breakpoints from './breakpoints';
import spacing from './spacing';

const theme = createTheme({
  colors: {
    primary: '#0000',
  },
  breakpoints,
  spacing,
});

export type Theme = typeof theme;
export default theme;
