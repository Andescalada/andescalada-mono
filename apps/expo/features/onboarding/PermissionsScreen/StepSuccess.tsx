import { Box, Button, Icon, Screen, Text } from "@andescalada/ui";
import { FC, useState } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
}

const StepSuccess: FC<Props> = ({ onNext }) => {
  const { width: screenWidth } = useWindowDimensions();

  const [isPressed, setIsPressed] = useState(false);

  return (
    <Screen
      flex={1}
      // backgroundColor="brand.primaryA"
      width={screenWidth}
      padding="m"
      alignItems="stretch"
      justifyContent="space-between"
    >
      <Box flex={1} alignItems="center" justifyContent="center" gap="l">
        <Box
          borderColor="grayscale.white"
          borderWidth={2}
          borderStyle="dashed"
          width={150}
          height={150}
          borderRadius={75}
          alignItems="center"
          justifyContent="center"
          padding="m"
        >
          <Icon name="dancing-dinosaur-color" size={80} />
        </Box>
        <Text variant="h1">Éxito</Text>
        <Text variant="h2" fontSize={50} lineHeight={50}>
          Bienvenido
        </Text>
        <Button
          title="Finalizar"
          variant="info"
          isLoading={isPressed}
          onPress={() => {
            setIsPressed(true);
            onNext();
          }}
        />
      </Box>
    </Screen>
  );
};

export default StepSuccess;
