import { Box, Screen, Text } from "@andescalada/ui";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

const StepWelcome: FC<Props> = (props) => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen maxWidth={screenWidth}>
      <Box flex={1} justifyContent="center" alignItems="center" padding="m">
        <Text variant="h1" numberOfLines={3}>
          Bienvenido al 1º concurso de documentación
        </Text>
      </Box>
    </Screen>
  );
};

export default StepWelcome;
