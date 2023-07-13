import { Box, Image, Screen, Text } from "@andescalada/ui";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

const SELECT_WALL_GIF =
  "https://res.cloudinary.com/fundacion-andescalada/image/upload/v1689273054/andescalada.org/ezgif.com-resize_cygiv2.gif";

const StepSelectWall: FC<Props> = () => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen
      width={screenWidth}
      padding="m"
      alignItems="center"
      justifyContent="center"
      bg="brand.primaryA"
    >
      <Box
        justifyContent="center"
        alignItems="center"
        bg="contrast.bright.red"
        width={300}
        borderRadius={8}
        overflow="hidden"
      >
        <Image
          contentFit="contain"
          width={300}
          height={339}
          source={SELECT_WALL_GIF}
        />
      </Box>
      <Box marginTop="xl">
        <Text variant="p1R" numberOfLines={3}>
          1º Paso: Busca la pared que quieres documentar
        </Text>
      </Box>
    </Screen>
  );
};

export default StepSelectWall;
