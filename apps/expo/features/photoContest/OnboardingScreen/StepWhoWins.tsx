import { Box, Image, Screen, Text } from "@andescalada/ui";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

const StepWhoWins: FC<Props> = (props) => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen width={screenWidth}>
      <Box
        flex={1}
        justifyContent="space-evenly"
        alignItems="flex-start"
        padding="l"
      >
        <Text variant="h1" numberOfLines={3}>
          ¿Quienes ganan?
        </Text>
        <Text variant="p1R" numberOfLines={3}>
          🏆 Las 3 personas a quienes elegimos más paredes
        </Text>
        <Text variant="p1R" numberOfLines={5}>
          🎲 Sorteo entre las personas que compartan una foto en su historia en
          Instagram etiquetando a @andescalada
        </Text>
        <Text>
          Puedes revisar más detalles de las bases en el siguiente enlace:
          [AGREGAR ENLANCE]
        </Text>
      </Box>
    </Screen>
  );
};

export default StepWhoWins;
