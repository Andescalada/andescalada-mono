import { Pressable, Text } from "@andescalada/ui";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks/useAppTheme";
import { ComponentProps, FC } from "react";

const BUTTON_SIZE = 50;

const NextButton: FC<ComponentProps<typeof Pressable>> = (props) => {
  const theme = useAppTheme();
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
      <Text variant="h4" marginRight="s">
        Siguiente
      </Text>
      <Ionicons
        name="arrow-forward"
        size={30}
        color={theme.colors["grayscale.white"]}
      />
    </Pressable>
  );
};

export default NextButton;
