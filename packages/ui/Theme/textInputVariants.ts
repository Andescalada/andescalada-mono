import { createBoxVariant } from '@andescalada/ui/Theme/createVariants';

const textFieldVariants = createBoxVariant({
  // outlined: {
  //   borderWidth: 1,
  //   borderColor: 'outlineTextFieldBorder',
  //   minHeight: 40,
  //   justifyContent: 'center',
  //   paddingLeft: 's',
  //   borderRadius: 100,
  // },
  // standard: {
  //   borderBottomWidth: 0.5,
  //   borderColor: 'dividerColor',
  //   paddingBottom: 's',
  // },
  disableAsText: {},
  filled: {
    borderRadius: 4,
    backgroundColor: 'filledTextInputVariantBackground',
  },
});

export default textFieldVariants;
