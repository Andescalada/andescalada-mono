import { BackButton } from "@andescalada/ui";
import textVariants from "@andescalada/ui/Theme/textVariants";
import { StackNavigationOptions } from "@react-navigation/stack";

const { fontFamily, fontSize, lineHeight } = textVariants.p1R;

const backHeader: StackNavigationOptions = {
  headerShown: true,
  headerTitleStyle: { fontFamily, fontSize, lineHeight },

  headerLeft: ({ onPress }) => (
    <BackButton onPress={onPress} marginLeft="s" marginBottom="s" />
  ),
};

export default backHeader;
