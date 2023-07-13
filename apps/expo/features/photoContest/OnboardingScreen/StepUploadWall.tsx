import { Box, Image, Screen, Text } from "@andescalada/ui";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

const StepUploadWall: FC<Props> = (props) => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen maxWidth={screenWidth}>
      <Box
        flex={1}
        justifyContent="space-evenly"
        alignItems="flex-start"
        padding="l"
      >
        <Text variant="p1R" numberOfLines={3}>
          Estamos buscando fotos de paredes de:
        </Text>
        <Text variant="p1R" numberOfLines={3}>
          La Cuesta las Chilcas y Cachacabuco
        </Text>

        <Text variant="p1R" numberOfLines={3}>
          1º Paso: Busca la pared que quieres documentar
        </Text>
        <Text variant="p1R" numberOfLines={3}>
          2º Sube una foto de la pared, puedes revisar las rutas que deben
          aparecer en esa pared
        </Text>
        <Text variant="p1R" numberOfLines={3}>
          3º Comparte la foto en una historia de Instagram y etiqueta a
          @andescalada
        </Text>
      </Box>
    </Screen>
  );
};

export default StepUploadWall;
