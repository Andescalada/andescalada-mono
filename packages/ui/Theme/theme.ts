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
    drawingRoutePath: pallete.contrast.opaque.green,
    routePath: pallete.contrast.opaque.red,
    extensionRoutePath: pallete.contrast.opaque.blue,
    background: pallete.grayscale.black,
    backgroundContrast: pallete.grayscale["100"],
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
    overPhotoOverlay: pallete.grayscale.transparent[50][600],
    tradRoutes: pallete.contrast.opaque.yellow,
    sportRoutes: pallete.contrast.opaque.red,
    iceRoutes: pallete.contrast.opaque.blue,
    mixedRoutes: pallete.contrast.opaque.pink,
    aidRoutes: pallete.contrast.opaque.purple,
    boulderRoutes: pallete.contrast.opaque.red,
    textButtonInfo: pallete.semantic.info,
    textButtonError: pallete.semantic.error,
    textButtonTransparent: pallete.grayscale[600],
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
