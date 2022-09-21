import { createBoxVariant } from "./createVariants";
import { pallete } from "./pallete";

export const semanticButtonVariantsColors = {
  errorSemanticButtonText: pallete.semantic.error,
  infoSemanticButtonText: pallete.semantic.info,
};

const semanticButtonVariants = createBoxVariant({
  error: {
    padding: "xs",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    padding: "xs",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default semanticButtonVariants;
