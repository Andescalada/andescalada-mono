import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { ComponentProps } from "react";

import BackButton from "../BackButton/BackButton";
import Box from "../Box";
import Text from "../Text";
import { Theme } from "../Theme/config";

interface Props extends ComponentProps<typeof Box> {
  title: string;
  onGoBack?: () => void;
  onOptions?: () => void;
  titleContainerProps?: ComponentProps<typeof Box>;
  titleProps?: ComponentProps<typeof Text>;
  backButtonProps?: ComponentProps<typeof BackButton>;
  iconProps?: ComponentProps<typeof Entypo>;
  showOptions?: boolean;
}

const Header = ({
  onGoBack,
  onOptions,
  title,
  titleContainerProps,
  titleProps,
  backButtonProps,
  iconProps,
  showOptions = true,
  ...props
}: Props) => {
  const theme = useTheme<Theme>();
  return (
    <Box flexDirection="row" alignItems="center" {...props}>
      <BackButton onPress={onGoBack} {...backButtonProps} />
      <Box flex={1} paddingHorizontal="s" {...titleContainerProps}>
        <Text
          variant="p1R"
          numberOfLines={1}
          ellipsizeMode="tail"
          {...titleProps}
        >
          {title}
        </Text>
      </Box>
      {showOptions && (
        <Entypo
          onPress={onOptions}
          name="dots-three-horizontal"
          size={24}
          color={theme.colors["grayscale.100"]}
          {...iconProps}
        />
      )}
    </Box>
  );
};

export default Header;
