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
    <Screen width={screenWidth}>
      <Box
        flex={1}
        justifyContent="space-evenly"
        alignItems="flex-start"
        padding="l"
      >
        <Text variant="p1R" numberOfLines={3}>
          2º Sube una foto de la pared, puedes revisar las rutas que deben
          aparecer en esa pared
        </Text>
      </Box>
    </Screen>
  );
};

export default StepUploadWall;
