import { Box, Icon, Screen, Text } from "@andescalada/ui";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

const StepWelcome: FC<Props> = () => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen width={screenWidth}>
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding="m"
        gap="l"
      >
        <Box
          height={150}
          width={150}
          borderRadius={150 / 2}
          backgroundColor="brand.secondaryB"
        >
          <Icon name="camera-color" size={150} />
        </Box>
        <Text variant="h1" numberOfLines={3}>
          Bienvenido al 1º concurso de documentación comunitaria.
        </Text>
      </Box>
    </Screen>
  );
};

export default StepWelcome;
