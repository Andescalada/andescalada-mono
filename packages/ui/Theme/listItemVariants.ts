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
    alignItems: "stretch",
    padding: "m",
  },
  accent: {
    borderColor: "brand.primaryA",
    borderWidth: 3,
    alignItems: "stretch",
    padding: "m",
  },
  danger: {
    borderColor: "semantic.transparent.50.error",
    borderWidth: 3,
    alignItems: "stretch",
    padding: "m",
  },
  warning: {
    borderColor: "semantic.transparent.50.warning",
    borderWidth: 3,
    alignItems: "stretch",
    padding: "m",
  },
});

export default listItemVariants;
