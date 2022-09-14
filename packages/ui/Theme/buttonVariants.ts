import { pallete } from './pallete';
import { createBoxVariant } from './createVariants';

export const buttonVariantsColors = {
  primaryButtonBackground: pallete.shadesB[100],
  primaryButtonText: pallete.shadesB[400],
};

const buttonVariants = createBoxVariant({
  primary: {
    backgroundColor: 'primaryButtonBackground',
    borderRadius: 5,
    padding: 'xs',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default buttonVariants;
