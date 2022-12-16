import { Box, Icon, Screen, Text } from "@andescalada/ui";
import NextButton from "@features/zoneManager/components/NextButton";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import { ComponentProps, FC } from "react";

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
      alignItems="stretch"
      justifyContent="space-between"
    >
      <Box flex={1}>
        <Text variant="h1">La zona ha sido creada exitosamente</Text>
        <Box alignSelf="center" marginVertical="l">
          <Icon name="thumb-up-color" color="semantic.success" size={70} />
        </Box>
        <Text variant="h3" color="grayscale.300" marginBottom="m">
          Sigue los siguientes pasos:
        </Text>
        <InstructionContainer
          backgroundColor="brand.secondaryA"
          number={1}
          description="Agrega los sectores de la zona"
        />
        <InstructionContainer
          backgroundColor="brand.secondaryA"
          number={2}
          description="Agrega cuantas paredes quieras al sector."
        />
        <InstructionContainer
          backgroundColor="brand.secondaryA"
          number={3}
          description="Sube una foto de la pared."
        />
        <InstructionContainer
          backgroundColor="brand.secondaryA"
          number={4}
          description="Agrega y dibuja la ruta sobre la pared."
        />
      </Box>
      <NextButton onPress={onNext} alignSelf="center" />
    </Screen>
  );
};

export default StepSuccess;

interface InstructionContainerProps extends ComponentProps<typeof Box> {
  number: number;
  description: string;
}

const InstructionContainer = ({
  number,
  description,
  ...props
}: InstructionContainerProps) => {
  return (
    <Box
      backgroundColor="brand.primaryA"
      padding="s"
      borderRadius={10}
      flexDirection="row"
      alignItems="center"
      marginVertical="xs"
      {...props}
    >
      <Text variant="h1" marginRight="s" color="grayscale.black">
        {number}
      </Text>
      <Box flex={1}>
        <Text variant="p2R" marginLeft={"s"} color="grayscale.black">
          {description}
        </Text>
      </Box>
    </Box>
  );
};
