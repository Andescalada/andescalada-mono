import { createBoxVariant } from "./createVariants";
import { pallete } from "./pallete";

export const lisItemVariantsColors = {
  listItemBackground: pallete.grayscale.transparent[50][600],
};

const listItemVariants = createBoxVariant({
  defaults: {
    borderColor: "listItemBackground",
    borderWidth: 3,
    alignItems: "stretch",
    padding: "m",
    borderRadius: 5,
  },
  fill: {
    backgroundColor: "listItemBackground",
  },
  accent: {
    borderColor: "brand.primaryA",
  },
  danger: {
    borderColor: "semantic.transparent.50.error",
  },
  warning: {
    borderColor: "semantic.transparent.50.warning",
  },
  plain: {
    borderWidth: 0,
    borderColor: undefined,
  },
  squared: {
    height: 100,
    width: 100,
    borderRadius: 16,
  },
  squaredPrimary: {
    height: 100,
    width: 100,
    borderRadius: 16,
    borderColor: "brand.primaryA",
  },
});

export default listItemVariants;
