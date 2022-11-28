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
  },
});

export default listItemVariants;
