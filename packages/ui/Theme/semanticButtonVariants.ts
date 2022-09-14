import { pallete } from './pallete';
import { createBoxVariant } from './createVariants';

export const semanticButtonVariantsColors = {
  errorButtonText: pallete.semantic.error,
};

const semanticButtonVariants = createBoxVariant({
  error: {
    padding: 'xs',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default semanticButtonVariants;
