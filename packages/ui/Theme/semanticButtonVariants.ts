import { pallete } from './pallete';
import { createBoxVariant } from './createVariants';

export const semanticButtonVariantsColors = {
  errorButtonText: pallete.semantic.error,
  infoButtonText: pallete.semantic.info,
};

const semanticButtonVariants = createBoxVariant({
  error: {
    padding: 'xs',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: 'xs',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default semanticButtonVariants;
