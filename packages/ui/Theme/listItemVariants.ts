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
  },
  primary: {
    backgroundColor: "listItemBackground",
    alignItems: "stretch",
    padding: "m",
  },
});

export default listItemVariants;
