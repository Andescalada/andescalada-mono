import { Box, Icon, Screen, Text } from "@andescalada/ui";
import NextButton from "@features/components/NextButton";
import getTrackingPermission from "@utils/trackingPermissions";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
}

const StepShareErrors: FC<Props> = ({ onNext }) => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen
      flex={1}
      backgroundColor="brand.secondaryB"
      width={screenWidth}
      padding="m"
      alignItems="stretch"
      justifyContent="space-between"
    >
      <Box flex={1} alignItems="center" justifyContent="center" gap="l">
        <Box
          borderColor="grayscale.800"
          borderWidth={2}
          borderStyle="dashed"
          width={150}
          height={150}
          borderRadius={75}
          alignItems="center"
          justifyContent="center"
          padding="m"
        >
          <Icon name="backpacker-senior-color" size={80} />
        </Box>
        <Text variant="h1" color="grayscale.800">
          Comparte tus errores
        </Text>
        <Text variant="p1R" textAlign="center" color="grayscale.800">
          Ayúdanos a mejorar la app compartiendo los errores que encuentres.
        </Text>
      </Box>

      <NextButton
        onPress={async () => {
          await getTrackingPermission().catch(() => {
            return;
          });

          onNext();
        }}
        alignSelf="center"
        titleProps={{ color: "grayscale.800" }}
      />
    </Screen>
  );
};

export default StepShareErrors;
