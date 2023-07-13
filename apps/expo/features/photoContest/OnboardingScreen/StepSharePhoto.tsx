import { Box, Image, Screen, Text } from "@andescalada/ui";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

const StepSharePhoto: FC<Props> = (props) => {
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
          3º Comparte la foto en una historia de Instagram y etiqueta a
          @andescalada
        </Text>
      </Box>
    </Screen>
  );
};

export default StepSharePhoto;
