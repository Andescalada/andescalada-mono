import { createBoxVariant } from "./createVariants";
import { pallete } from "./pallete";

export const semanticButtonVariantsColors = {
  errorSemanticButtonText: pallete.semantic.error,
  infoSemanticButtonText: pallete.semantic.info,
};

const semanticButtonVariants = createBoxVariant({
  error: {
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default semanticButtonVariants;
