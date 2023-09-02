import { createBoxVariant } from "./createVariants";
import { pallete } from "./pallete";

export const buttonVariantsColors = {
  primaryButtonBackground: pallete.shadesB[100],
  primaryButtonText: pallete.shadesB[400],
  transparentButtonBackground: pallete.grayscale.transparent[50][300],
  transparentButtonText: pallete.grayscale.black,
  transparentSimplifiedButtonBackground: pallete.grayscale.transparent[50][300],
  transparentSimplifiedButtonText: pallete.grayscale.black,
  infoSimplifiedButtonBackground: pallete.semantic.info,
  infoSimplifiedButtonText: pallete.grayscale.white,
  successButtonBackground: pallete.semantic.success,
  successButtonText: pallete.grayscale.white,
  successSmallOutlineButtonText: pallete.grayscale.black,
  errorButtonBackground: pallete.semantic.error,
  errorButtonText: pallete.grayscale.white,
  infoButtonBackground: pallete.semantic.info,
  infoButtonText: pallete.grayscale.white,
  infoSmallButtonText: pallete.grayscale.white,
  infoSmallOutlineButtonText: pallete.grayscale.white,
  contrastButtonText: pallete.grayscale.black,
  warningButtonBackground: pallete.semantic.warning,
  warningButtonText: pallete.grayscale.black,
};

const buttonVariants = createBoxVariant({
  primary: {
    backgroundColor: "primaryButtonBackground",
    borderRadius: 5,
    padding: "xs",
    justifyContent: "center",
    alignItems: "center",
  },
  transparent: {
    backgroundColor: "transparentButtonBackground",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  contrast: {
    backgroundColor: "backgroundContrast",
    borderRadius: 100,
    padding: "m",
    justifyContent: "center",
    alignItems: "center",
  },
  transparentSimplified: {
    backgroundColor: "transparentButtonBackground",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSimplified: {
    backgroundColor: "infoSimplifiedButtonBackground",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  success: {
    backgroundColor: "successButtonBackground",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    backgroundColor: "errorButtonBackground",
    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",
  },
  warning: {
    backgroundColor: "warningButtonBackground",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    backgroundColor: "infoButtonBackground",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSmall: {
    backgroundColor: "infoButtonBackground",
    borderColor: "infoButtonBackground",
    borderWidth: 3,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSmallOutline: {
    borderColor: "infoButtonBackground",
    borderWidth: 3,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  successSmallOutline: {
    borderColor: "successButtonBackground",
    borderWidth: 3,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default buttonVariants;
