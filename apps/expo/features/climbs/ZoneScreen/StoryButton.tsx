import { IconNames } from "@andescalada/icons/NativeIcons";
import { Box, Icon, Pressable, Text } from "@andescalada/ui";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Pressable> {
  title: string;
  iconName?: IconNames;
  iconSize?: number;
}

const StoryButton = ({ title, iconName, iconSize, ...props }: Props) => (
  <Pressable
    alignItems="center"
    marginHorizontal="xs"
    height={60}
    width={60}
    {...props}
  >
    <Box
      height={60}
      width={60}
      borderRadius={30}
      borderWidth={2}
      borderColor="brand.primaryA"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <Icon name={iconName} size={iconSize} />
    </Box>
    <Text variant="caption" marginTop="xs" textAlign="center" fontSize={10}>
      {title}
    </Text>
  </Pressable>
);

export default StoryButton;
