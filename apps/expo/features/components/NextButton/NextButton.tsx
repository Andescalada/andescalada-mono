import { Colors, Ionicons, Pressable, Text } from "@andescalada/ui";
import { ComponentProps, FC } from "react";

const BUTTON_SIZE = 50;

interface Props extends ComponentProps<typeof Pressable> {
  titleProps?: ComponentProps<typeof Text>;
}

const NextButton: FC<Props> = ({ titleProps, ...props }) => {
  return (
    <Pressable
      backgroundColor="transparentButtonBackground"
      height={BUTTON_SIZE}
      paddingHorizontal="m"
      borderRadius={BUTTON_SIZE / 2}
      justifyContent="center"
      alignItems={"center"}
      flexDirection="row"
      marginBottom="xxl"
      {...props}
    >
      <Text variant="h4" marginRight="s" {...titleProps}>
        Siguiente
      </Text>
      <Ionicons
        name="arrow-forward"
        size={30}
        color={(titleProps?.color as Colors) || "grayscale.white"}
      />
    </Pressable>
  );
};

export default NextButton;
