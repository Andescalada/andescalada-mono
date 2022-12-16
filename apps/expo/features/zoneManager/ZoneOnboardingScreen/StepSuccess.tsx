import { Box, Icon, Screen, Text } from "@andescalada/ui";
import NextButton from "@features/zoneManager/components/NextButton";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import { FC } from "react";

interface Props {
  onNext: () => void;
}

const StepSuccess: FC<Props> = ({ onNext }) => {
  return (
    <Screen
      flex={1}
      backgroundColor="brand.primaryA"
      width={SCREEN_WIDTH}
      padding="m"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box flex={1}>
        <Text variant="h1">La zona ha sido creada exitosamente</Text>
        <Box alignSelf="center" marginVertical="l">
          <Icon name="thumb-up-color" color="semantic.success" size={70} />
        </Box>
        <Text variant="h3" color="grayscale.500" marginBottom="xl">
          ¡Comienza a agregar sectores, paredes y rutas!
        </Text>
        <Box
          backgroundColor="brand.secondaryA"
          padding="s"
          borderRadius={10}
          flexDirection="row"
          alignItems="center"
        >
          <Icon name="eyes-color" color="semantic.success" size={50} />
          <Box flex={1}>
            <Text variant="p2R" color="grayscale.black" marginLeft={"s"}>
              La zona no se publica automáticamente, para que esté disponible
              debes
              <Text
                variant="p2R"
                textDecorationLine="underline"
                color="grayscale.black"
              >
                {` publicarla.`}
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
      <NextButton onPress={onNext} />
    </Screen>
  );
};

export default StepSuccess;
