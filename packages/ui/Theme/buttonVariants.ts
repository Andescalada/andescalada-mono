import { pallete } from './pallete';
import { createBoxVariant } from './createVariants';

export const buttonVariantsColors = {
  primaryButtonBackground: pallete.shadesB[100],
  primaryButtonText: pallete.shadesB[400],
  transparentButtonBackground: pallete.grayscale.transparent[80][600],
  transparentButtonText: pallete.grayscale.black,
  successButtonBackground: pallete.semantic.success,
  successButtonText: pallete.grayscale.white,
  errorButtonBackground: pallete.semantic.error,
  errorButtonText: pallete.grayscale.white,
};

const buttonVariants = createBoxVariant({
  primary: {
    backgroundColor: 'primaryButtonBackground',
    borderRadius: 5,
    padding: 'xs',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparent: {
    backgroundColor: 'transparentButtonBackground',
    borderRadius: 100,
    padding: 'm',
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    backgroundColor: 'successButtonBackground',
    borderRadius: 100,
    padding: 'm',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    backgroundColor: 'errorButtonBackground',
    borderRadius: 100,
    padding: 'm',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default buttonVariants;
