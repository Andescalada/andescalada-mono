import { createBoxVariant } from "./createVariants";
import { pallete } from "./pallete";

export const lisItemVariantsColors = {
  listItemBackground: pallete.grayscale[600],
};

const listItemVariants = createBoxVariant({
  defaults: {
    backgroundColor: "listItemBackground",
    alignItems: "stretch",
    padding: "m",
    borderRadius: 5,
  },
  primary: {
    backgroundColor: "listItemBackground",
    alignItems: "stretch",
    padding: "m",
  },
  transparent: {
    backgroundColor: "grayscale.transparent.50.400",
    alignItems: "stretch",
    padding: "m",
  },
  accent: {
    backgroundColor: "brand.primaryA",
    alignItems: "stretch",
    padding: "m",
  },
});

export default listItemVariants;
