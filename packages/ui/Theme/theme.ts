import { createTheme } from '@shopify/restyle';
import breakpoints from './breakpoints';
import { pallete } from './pallete';
import spacing from './spacing';
import textVariants from './textVariants';
import textInputVariants from './textInputVariants';
import semanticButtonVariants, {
  semanticButtonVariantsColors,
} from './semanticButtonVariants';
import buttonVariants, { buttonVariantsColors } from './buttonVariants';

const variants = {
  textVariants,
  textInputVariants,
  buttonVariants,
  semanticButtonVariants,
};

const darkBaseTheme = {
  colors: {
    primary: pallete.brand.primaryB,
    text: pallete.grayscale[100],
    textContrast: pallete.grayscale.black,
    listItemBackground: pallete.grayscale[600],
    filledTextInputVariantBackground: pallete.grayscale[300],
    filledTextInputVariantPlaceholder: pallete.grayscale.black,

    ...buttonVariantsColors,
    ...semanticButtonVariantsColors,
    ...pallete.semantic,
  },
  breakpoints,
  spacing,
};

const theme = createTheme({ ...darkBaseTheme, ...variants });

export type Theme = typeof theme;
export type BaseTheme = typeof darkBaseTheme;
export type Colors = Partial<keyof Omit<Theme['colors'], 'defaults'>>;
export default theme;
