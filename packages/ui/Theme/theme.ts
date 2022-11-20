import { flattenObject } from "@andescalada/utils/flattenObject";
import { createTheme } from "@shopify/restyle";

import breakpoints from "./breakpoints";
import buttonVariants, { buttonVariantsColors } from "./buttonVariants";
import listItemVariants, { lisItemVariantsColors } from "./listItemVariants";
import { pallete } from "./pallete";
import semanticButtonVariants, {
  semanticButtonVariantsColors,
} from "./semanticButtonVariants";
import spacing from "./spacing";
import textInputVariants from "./textInputVariants";
import textVariants from "./textVariants";

const variants = {
  textVariants,
  textInputVariants,
  buttonVariants,
  semanticButtonVariants,
  listItemVariants,
};

const darkBaseTheme = {
  colors: {
    primary: pallete.brand.primaryB,
    gradientA: pallete.brand.primaryA,
    gradientB: pallete.brand.primaryB,
    private: pallete.brand.primaryA,
    drawingRoutePath: pallete.contrast.green,
    routePath: pallete.contrast.red,
    background: pallete.grayscale.black,
    text: pallete.grayscale[100],
    textContrast: pallete.grayscale.black,
    filledTextInputVariantBackground: pallete.grayscale[300],
    filledTextInputVariantPlaceholder: pallete.grayscale["500"],
    selectedButtonGroup: pallete.brand.primaryA,
    buttonGroup: pallete.grayscale[600],
    transitionScreen: pallete.grayscale.black,
    zoneOptionsIcons: pallete.grayscale[500],
    zoneBadge: pallete.brand.primaryB,
    routeBadge: pallete.brand.primaryA,
    wallBadge: pallete.brand.secondaryA,
    sectorBadge: pallete.brand.secondaryB,
    ...lisItemVariantsColors,
    ...buttonVariantsColors,
    ...semanticButtonVariantsColors,
    ...flattenObject(pallete),
  },
  breakpoints,
  spacing,
};

const theme = createTheme({ ...darkBaseTheme, ...variants });

export type Theme = typeof theme;
export type BaseTheme = typeof darkBaseTheme;
export type Colors = Partial<keyof Omit<Theme["colors"], "defaults">>;
export default theme;
