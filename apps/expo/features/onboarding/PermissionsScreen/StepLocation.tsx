import { Box, Icon, Screen, Text } from "@andescalada/ui";
import NextButton from "@features/components/NextButton";
import getLocation from "@utils/getLocation";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
}

const StepLocation: FC<Props> = ({ onNext }) => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen
      flex={1}
      backgroundColor="brand.primaryA"
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
          <Icon name="pin-color" size={80} />
        </Box>
        <Text variant="h1">Ubicación</Text>
        <Text variant="p1R" textAlign="center">
          Usamos tu ubicación para mostrarte las zonas cercanas.
        </Text>
      </Box>

      <NextButton
        onPress={async () => {
          await getLocation().catch(() => {
            return;
          });
          onNext();
        }}
        alignSelf="center"
      />
    </Screen>
  );
};

export default StepLocation;
